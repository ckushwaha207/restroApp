package com.fa.web.rest;

import com.fa.FoodAppetencyApp;

import com.fa.domain.BusinessUser;
import com.fa.repository.BusinessUserRepository;
import com.fa.service.BusinessUserService;
import com.fa.repository.search.BusinessUserSearchRepository;
import com.fa.service.dto.BusinessUserDTO;
import com.fa.service.mapper.BusinessUserMapper;
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

/**
 * Test class for the BusinessUserResource REST controller.
 *
 * @see BusinessUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FoodAppetencyApp.class)
public class BusinessUserResourceIntTest {

    @Autowired
    private BusinessUserRepository businessUserRepository;

    @Autowired
    private BusinessUserMapper businessUserMapper;

    @Autowired
    private BusinessUserService businessUserService;

    @Autowired
    private BusinessUserSearchRepository businessUserSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBusinessUserMockMvc;

    private BusinessUser businessUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BusinessUserResource businessUserResource = new BusinessUserResource(businessUserService);
        this.restBusinessUserMockMvc = MockMvcBuilders.standaloneSetup(businessUserResource)
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
    public static BusinessUser createEntity(EntityManager em) {
        BusinessUser businessUser = new BusinessUser();
        return businessUser;
    }

    @Before
    public void initTest() {
        businessUserSearchRepository.deleteAll();
        businessUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusinessUser() throws Exception {
        int databaseSizeBeforeCreate = businessUserRepository.findAll().size();

        // Create the BusinessUser
        BusinessUserDTO businessUserDTO = businessUserMapper.businessUserToBusinessUserDTO(businessUser);
        restBusinessUserMockMvc.perform(post("/api/business-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessUserDTO)))
            .andExpect(status().isCreated());

        // Validate the BusinessUser in the database
        List<BusinessUser> businessUserList = businessUserRepository.findAll();
        assertThat(businessUserList).hasSize(databaseSizeBeforeCreate + 1);
        BusinessUser testBusinessUser = businessUserList.get(businessUserList.size() - 1);

        // Validate the BusinessUser in Elasticsearch
        BusinessUser businessUserEs = businessUserSearchRepository.findOne(testBusinessUser.getId());
        assertThat(businessUserEs).isEqualToComparingFieldByField(testBusinessUser);
    }

    @Test
    @Transactional
    public void createBusinessUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessUserRepository.findAll().size();

        // Create the BusinessUser with an existing ID
        businessUser.setId(1L);
        BusinessUserDTO businessUserDTO = businessUserMapper.businessUserToBusinessUserDTO(businessUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessUserMockMvc.perform(post("/api/business-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<BusinessUser> businessUserList = businessUserRepository.findAll();
        assertThat(businessUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBusinessUsers() throws Exception {
        // Initialize the database
        businessUserRepository.saveAndFlush(businessUser);

        // Get all the businessUserList
        restBusinessUserMockMvc.perform(get("/api/business-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessUser.getId().intValue())));
    }

    @Test
    @Transactional
    public void getBusinessUser() throws Exception {
        // Initialize the database
        businessUserRepository.saveAndFlush(businessUser);

        // Get the businessUser
        restBusinessUserMockMvc.perform(get("/api/business-users/{id}", businessUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(businessUser.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBusinessUser() throws Exception {
        // Get the businessUser
        restBusinessUserMockMvc.perform(get("/api/business-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusinessUser() throws Exception {
        // Initialize the database
        businessUserRepository.saveAndFlush(businessUser);
        businessUserSearchRepository.save(businessUser);
        int databaseSizeBeforeUpdate = businessUserRepository.findAll().size();

        // Update the businessUser
        BusinessUser updatedBusinessUser = businessUserRepository.findOne(businessUser.getId());
        BusinessUserDTO businessUserDTO = businessUserMapper.businessUserToBusinessUserDTO(updatedBusinessUser);

        restBusinessUserMockMvc.perform(put("/api/business-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessUserDTO)))
            .andExpect(status().isOk());

        // Validate the BusinessUser in the database
        List<BusinessUser> businessUserList = businessUserRepository.findAll();
        assertThat(businessUserList).hasSize(databaseSizeBeforeUpdate);
        BusinessUser testBusinessUser = businessUserList.get(businessUserList.size() - 1);

        // Validate the BusinessUser in Elasticsearch
        BusinessUser businessUserEs = businessUserSearchRepository.findOne(testBusinessUser.getId());
        assertThat(businessUserEs).isEqualToComparingFieldByField(testBusinessUser);
    }

    @Test
    @Transactional
    public void updateNonExistingBusinessUser() throws Exception {
        int databaseSizeBeforeUpdate = businessUserRepository.findAll().size();

        // Create the BusinessUser
        BusinessUserDTO businessUserDTO = businessUserMapper.businessUserToBusinessUserDTO(businessUser);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBusinessUserMockMvc.perform(put("/api/business-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessUserDTO)))
            .andExpect(status().isCreated());

        // Validate the BusinessUser in the database
        List<BusinessUser> businessUserList = businessUserRepository.findAll();
        assertThat(businessUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBusinessUser() throws Exception {
        // Initialize the database
        businessUserRepository.saveAndFlush(businessUser);
        businessUserSearchRepository.save(businessUser);
        int databaseSizeBeforeDelete = businessUserRepository.findAll().size();

        // Get the businessUser
        restBusinessUserMockMvc.perform(delete("/api/business-users/{id}", businessUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean businessUserExistsInEs = businessUserSearchRepository.exists(businessUser.getId());
        assertThat(businessUserExistsInEs).isFalse();

        // Validate the database is empty
        List<BusinessUser> businessUserList = businessUserRepository.findAll();
        assertThat(businessUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchBusinessUser() throws Exception {
        // Initialize the database
        businessUserRepository.saveAndFlush(businessUser);
        businessUserSearchRepository.save(businessUser);

        // Search the businessUser
        restBusinessUserMockMvc.perform(get("/api/_search/business-users?query=id:" + businessUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessUser.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessUser.class);
    }
}
