package com.fa.web.rest;

import com.fa.FoodAppetencyApp;

import com.fa.domain.CommerceItem;
import com.fa.repository.CommerceItemRepository;
import com.fa.service.CommerceItemService;
import com.fa.repository.search.CommerceItemSearchRepository;
import com.fa.service.dto.CommerceItemDTO;
import com.fa.service.mapper.CommerceItemMapper;
import com.fa.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fa.domain.enumeration.ItemState;
/**
 * Test class for the CommerceItemResource REST controller.
 *
 * @see CommerceItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FoodAppetencyApp.class)
public class CommerceItemResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final ItemState DEFAULT_STATE = ItemState.INITIAL;
    private static final ItemState UPDATED_STATE = ItemState.ITEM_NOT_FOUND;

    private static final String DEFAULT_STATE_DETAIL = "AAAAAAAAAA";
    private static final String UPDATED_STATE_DETAIL = "BBBBBBBBBB";

    private static final Double DEFAULT_TOTAL_PRICE = 1D;
    private static final Double UPDATED_TOTAL_PRICE = 2D;

    @Autowired
    private CommerceItemRepository commerceItemRepository;

    @Autowired
    private CommerceItemMapper commerceItemMapper;

    @Autowired
    private CommerceItemService commerceItemService;

    @Autowired
    private CommerceItemSearchRepository commerceItemSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCommerceItemMockMvc;

    private CommerceItem commerceItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CommerceItemResource commerceItemResource = new CommerceItemResource(commerceItemService);
        this.restCommerceItemMockMvc = MockMvcBuilders.standaloneSetup(commerceItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommerceItem createEntity(EntityManager em) {
        CommerceItem commerceItem = new CommerceItem()
            .quantity(DEFAULT_QUANTITY)
            .state(DEFAULT_STATE)
            .stateDetail(DEFAULT_STATE_DETAIL)
            .totalPrice(DEFAULT_TOTAL_PRICE);
        return commerceItem;
    }

    @Before
    public void initTest() {
        commerceItemSearchRepository.deleteAll();
        commerceItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommerceItem() throws Exception {
        int databaseSizeBeforeCreate = commerceItemRepository.findAll().size();

        // Create the CommerceItem
        CommerceItemDTO commerceItemDTO = commerceItemMapper.commerceItemToCommerceItemDTO(commerceItem);
        restCommerceItemMockMvc.perform(post("/api/commerce-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commerceItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CommerceItem in the database
        List<CommerceItem> commerceItemList = commerceItemRepository.findAll();
        assertThat(commerceItemList).hasSize(databaseSizeBeforeCreate + 1);
        CommerceItem testCommerceItem = commerceItemList.get(commerceItemList.size() - 1);
        assertThat(testCommerceItem.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testCommerceItem.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testCommerceItem.getStateDetail()).isEqualTo(DEFAULT_STATE_DETAIL);
        assertThat(testCommerceItem.getTotalPrice()).isEqualTo(DEFAULT_TOTAL_PRICE);

        // Validate the CommerceItem in Elasticsearch
        CommerceItem commerceItemEs = commerceItemSearchRepository.findOne(testCommerceItem.getId());
        assertThat(commerceItemEs).isEqualToComparingFieldByField(testCommerceItem);
    }

    @Test
    @Transactional
    public void createCommerceItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commerceItemRepository.findAll().size();

        // Create the CommerceItem with an existing ID
        commerceItem.setId(1L);
        CommerceItemDTO commerceItemDTO = commerceItemMapper.commerceItemToCommerceItemDTO(commerceItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommerceItemMockMvc.perform(post("/api/commerce-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commerceItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<CommerceItem> commerceItemList = commerceItemRepository.findAll();
        assertThat(commerceItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCommerceItems() throws Exception {
        // Initialize the database
        commerceItemRepository.saveAndFlush(commerceItem);

        // Get all the commerceItemList
        restCommerceItemMockMvc.perform(get("/api/commerce-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commerceItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].stateDetail").value(hasItem(DEFAULT_STATE_DETAIL.toString())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.doubleValue())));
    }

    @Test
    @Transactional
    public void getCommerceItem() throws Exception {
        // Initialize the database
        commerceItemRepository.saveAndFlush(commerceItem);

        // Get the commerceItem
        restCommerceItemMockMvc.perform(get("/api/commerce-items/{id}", commerceItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(commerceItem.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.stateDetail").value(DEFAULT_STATE_DETAIL.toString()))
            .andExpect(jsonPath("$.totalPrice").value(DEFAULT_TOTAL_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCommerceItem() throws Exception {
        // Get the commerceItem
        restCommerceItemMockMvc.perform(get("/api/commerce-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommerceItem() throws Exception {
        // Initialize the database
        commerceItemRepository.saveAndFlush(commerceItem);
        commerceItemSearchRepository.save(commerceItem);
        int databaseSizeBeforeUpdate = commerceItemRepository.findAll().size();

        // Update the commerceItem
        CommerceItem updatedCommerceItem = commerceItemRepository.findOne(commerceItem.getId());
        updatedCommerceItem
            .quantity(UPDATED_QUANTITY)
            .state(UPDATED_STATE)
            .stateDetail(UPDATED_STATE_DETAIL)
            .totalPrice(UPDATED_TOTAL_PRICE);
        CommerceItemDTO commerceItemDTO = commerceItemMapper.commerceItemToCommerceItemDTO(updatedCommerceItem);

        restCommerceItemMockMvc.perform(put("/api/commerce-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commerceItemDTO)))
            .andExpect(status().isOk());

        // Validate the CommerceItem in the database
        List<CommerceItem> commerceItemList = commerceItemRepository.findAll();
        assertThat(commerceItemList).hasSize(databaseSizeBeforeUpdate);
        CommerceItem testCommerceItem = commerceItemList.get(commerceItemList.size() - 1);
        assertThat(testCommerceItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testCommerceItem.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testCommerceItem.getStateDetail()).isEqualTo(UPDATED_STATE_DETAIL);
        assertThat(testCommerceItem.getTotalPrice()).isEqualTo(UPDATED_TOTAL_PRICE);

        // Validate the CommerceItem in Elasticsearch
        CommerceItem commerceItemEs = commerceItemSearchRepository.findOne(testCommerceItem.getId());
        assertThat(commerceItemEs).isEqualToComparingFieldByField(testCommerceItem);
    }

    @Test
    @Transactional
    public void updateNonExistingCommerceItem() throws Exception {
        int databaseSizeBeforeUpdate = commerceItemRepository.findAll().size();

        // Create the CommerceItem
        CommerceItemDTO commerceItemDTO = commerceItemMapper.commerceItemToCommerceItemDTO(commerceItem);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCommerceItemMockMvc.perform(put("/api/commerce-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commerceItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CommerceItem in the database
        List<CommerceItem> commerceItemList = commerceItemRepository.findAll();
        assertThat(commerceItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCommerceItem() throws Exception {
        // Initialize the database
        commerceItemRepository.saveAndFlush(commerceItem);
        commerceItemSearchRepository.save(commerceItem);
        int databaseSizeBeforeDelete = commerceItemRepository.findAll().size();

        // Get the commerceItem
        restCommerceItemMockMvc.perform(delete("/api/commerce-items/{id}", commerceItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean commerceItemExistsInEs = commerceItemSearchRepository.exists(commerceItem.getId());
        assertThat(commerceItemExistsInEs).isFalse();

        // Validate the database is empty
        List<CommerceItem> commerceItemList = commerceItemRepository.findAll();
        assertThat(commerceItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCommerceItem() throws Exception {
        // Initialize the database
        commerceItemRepository.saveAndFlush(commerceItem);
        commerceItemSearchRepository.save(commerceItem);

        // Search the commerceItem
        restCommerceItemMockMvc.perform(get("/api/_search/commerce-items?query=id:" + commerceItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commerceItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].stateDetail").value(hasItem(DEFAULT_STATE_DETAIL.toString())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommerceItem.class);
    }
}
