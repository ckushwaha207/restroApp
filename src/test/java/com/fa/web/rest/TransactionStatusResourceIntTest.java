package com.fa.web.rest;

import com.fa.FoodAppetencyApp;

import com.fa.domain.TransactionStatus;
import com.fa.repository.TransactionStatusRepository;
import com.fa.service.TransactionStatusService;
import com.fa.repository.search.TransactionStatusSearchRepository;
import com.fa.service.dto.TransactionStatusDTO;
import com.fa.service.mapper.TransactionStatusMapper;
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
 * Test class for the TransactionStatusResource REST controller.
 *
 * @see TransactionStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FoodAppetencyApp.class)
public class TransactionStatusResourceIntTest {

    private static final String DEFAULT_TRANSACTION_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_ID = "BBBBBBBBBB";

    private static final Boolean DEFAULT_TRANSACTION_SUCCESS = false;
    private static final Boolean UPDATED_TRANSACTION_SUCCESS = true;

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final String DEFAULT_ERROR_CODE = "AAAAAAAAAA";
    private static final String UPDATED_ERROR_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_ERROR_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_ERROR_MESSAGE = "BBBBBBBBBB";

    @Autowired
    private TransactionStatusRepository transactionStatusRepository;

    @Autowired
    private TransactionStatusMapper transactionStatusMapper;

    @Autowired
    private TransactionStatusService transactionStatusService;

    @Autowired
    private TransactionStatusSearchRepository transactionStatusSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransactionStatusMockMvc;

    private TransactionStatus transactionStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TransactionStatusResource transactionStatusResource = new TransactionStatusResource(transactionStatusService);
        this.restTransactionStatusMockMvc = MockMvcBuilders.standaloneSetup(transactionStatusResource)
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
    public static TransactionStatus createEntity(EntityManager em) {
        TransactionStatus transactionStatus = new TransactionStatus()
            .transactionId(DEFAULT_TRANSACTION_ID)
            .transactionSuccess(DEFAULT_TRANSACTION_SUCCESS)
            .amount(DEFAULT_AMOUNT)
            .errorCode(DEFAULT_ERROR_CODE)
            .errorMessage(DEFAULT_ERROR_MESSAGE);
        return transactionStatus;
    }

    @Before
    public void initTest() {
        transactionStatusSearchRepository.deleteAll();
        transactionStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransactionStatus() throws Exception {
        int databaseSizeBeforeCreate = transactionStatusRepository.findAll().size();

        // Create the TransactionStatus
        TransactionStatusDTO transactionStatusDTO = transactionStatusMapper.transactionStatusToTransactionStatusDTO(transactionStatus);
        restTransactionStatusMockMvc.perform(post("/api/transaction-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionStatusDTO)))
            .andExpect(status().isCreated());

        // Validate the TransactionStatus in the database
        List<TransactionStatus> transactionStatusList = transactionStatusRepository.findAll();
        assertThat(transactionStatusList).hasSize(databaseSizeBeforeCreate + 1);
        TransactionStatus testTransactionStatus = transactionStatusList.get(transactionStatusList.size() - 1);
        assertThat(testTransactionStatus.getTransactionId()).isEqualTo(DEFAULT_TRANSACTION_ID);
        assertThat(testTransactionStatus.isTransactionSuccess()).isEqualTo(DEFAULT_TRANSACTION_SUCCESS);
        assertThat(testTransactionStatus.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testTransactionStatus.getErrorCode()).isEqualTo(DEFAULT_ERROR_CODE);
        assertThat(testTransactionStatus.getErrorMessage()).isEqualTo(DEFAULT_ERROR_MESSAGE);

        // Validate the TransactionStatus in Elasticsearch
        TransactionStatus transactionStatusEs = transactionStatusSearchRepository.findOne(testTransactionStatus.getId());
        assertThat(transactionStatusEs).isEqualToComparingFieldByField(testTransactionStatus);
    }

    @Test
    @Transactional
    public void createTransactionStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transactionStatusRepository.findAll().size();

        // Create the TransactionStatus with an existing ID
        transactionStatus.setId(1L);
        TransactionStatusDTO transactionStatusDTO = transactionStatusMapper.transactionStatusToTransactionStatusDTO(transactionStatus);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionStatusMockMvc.perform(post("/api/transaction-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionStatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TransactionStatus> transactionStatusList = transactionStatusRepository.findAll();
        assertThat(transactionStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTransactionIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = transactionStatusRepository.findAll().size();
        // set the field null
        transactionStatus.setTransactionId(null);

        // Create the TransactionStatus, which fails.
        TransactionStatusDTO transactionStatusDTO = transactionStatusMapper.transactionStatusToTransactionStatusDTO(transactionStatus);

        restTransactionStatusMockMvc.perform(post("/api/transaction-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionStatusDTO)))
            .andExpect(status().isBadRequest());

        List<TransactionStatus> transactionStatusList = transactionStatusRepository.findAll();
        assertThat(transactionStatusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransactionStatuses() throws Exception {
        // Initialize the database
        transactionStatusRepository.saveAndFlush(transactionStatus);

        // Get all the transactionStatusList
        restTransactionStatusMockMvc.perform(get("/api/transaction-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionId").value(hasItem(DEFAULT_TRANSACTION_ID.toString())))
            .andExpect(jsonPath("$.[*].transactionSuccess").value(hasItem(DEFAULT_TRANSACTION_SUCCESS.booleanValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].errorCode").value(hasItem(DEFAULT_ERROR_CODE.toString())))
            .andExpect(jsonPath("$.[*].errorMessage").value(hasItem(DEFAULT_ERROR_MESSAGE.toString())));
    }

    @Test
    @Transactional
    public void getTransactionStatus() throws Exception {
        // Initialize the database
        transactionStatusRepository.saveAndFlush(transactionStatus);

        // Get the transactionStatus
        restTransactionStatusMockMvc.perform(get("/api/transaction-statuses/{id}", transactionStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transactionStatus.getId().intValue()))
            .andExpect(jsonPath("$.transactionId").value(DEFAULT_TRANSACTION_ID.toString()))
            .andExpect(jsonPath("$.transactionSuccess").value(DEFAULT_TRANSACTION_SUCCESS.booleanValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.errorCode").value(DEFAULT_ERROR_CODE.toString()))
            .andExpect(jsonPath("$.errorMessage").value(DEFAULT_ERROR_MESSAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransactionStatus() throws Exception {
        // Get the transactionStatus
        restTransactionStatusMockMvc.perform(get("/api/transaction-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransactionStatus() throws Exception {
        // Initialize the database
        transactionStatusRepository.saveAndFlush(transactionStatus);
        transactionStatusSearchRepository.save(transactionStatus);
        int databaseSizeBeforeUpdate = transactionStatusRepository.findAll().size();

        // Update the transactionStatus
        TransactionStatus updatedTransactionStatus = transactionStatusRepository.findOne(transactionStatus.getId());
        updatedTransactionStatus
            .transactionId(UPDATED_TRANSACTION_ID)
            .transactionSuccess(UPDATED_TRANSACTION_SUCCESS)
            .amount(UPDATED_AMOUNT)
            .errorCode(UPDATED_ERROR_CODE)
            .errorMessage(UPDATED_ERROR_MESSAGE);
        TransactionStatusDTO transactionStatusDTO = transactionStatusMapper.transactionStatusToTransactionStatusDTO(updatedTransactionStatus);

        restTransactionStatusMockMvc.perform(put("/api/transaction-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionStatusDTO)))
            .andExpect(status().isOk());

        // Validate the TransactionStatus in the database
        List<TransactionStatus> transactionStatusList = transactionStatusRepository.findAll();
        assertThat(transactionStatusList).hasSize(databaseSizeBeforeUpdate);
        TransactionStatus testTransactionStatus = transactionStatusList.get(transactionStatusList.size() - 1);
        assertThat(testTransactionStatus.getTransactionId()).isEqualTo(UPDATED_TRANSACTION_ID);
        assertThat(testTransactionStatus.isTransactionSuccess()).isEqualTo(UPDATED_TRANSACTION_SUCCESS);
        assertThat(testTransactionStatus.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testTransactionStatus.getErrorCode()).isEqualTo(UPDATED_ERROR_CODE);
        assertThat(testTransactionStatus.getErrorMessage()).isEqualTo(UPDATED_ERROR_MESSAGE);

        // Validate the TransactionStatus in Elasticsearch
        TransactionStatus transactionStatusEs = transactionStatusSearchRepository.findOne(testTransactionStatus.getId());
        assertThat(transactionStatusEs).isEqualToComparingFieldByField(testTransactionStatus);
    }

    @Test
    @Transactional
    public void updateNonExistingTransactionStatus() throws Exception {
        int databaseSizeBeforeUpdate = transactionStatusRepository.findAll().size();

        // Create the TransactionStatus
        TransactionStatusDTO transactionStatusDTO = transactionStatusMapper.transactionStatusToTransactionStatusDTO(transactionStatus);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransactionStatusMockMvc.perform(put("/api/transaction-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionStatusDTO)))
            .andExpect(status().isCreated());

        // Validate the TransactionStatus in the database
        List<TransactionStatus> transactionStatusList = transactionStatusRepository.findAll();
        assertThat(transactionStatusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTransactionStatus() throws Exception {
        // Initialize the database
        transactionStatusRepository.saveAndFlush(transactionStatus);
        transactionStatusSearchRepository.save(transactionStatus);
        int databaseSizeBeforeDelete = transactionStatusRepository.findAll().size();

        // Get the transactionStatus
        restTransactionStatusMockMvc.perform(delete("/api/transaction-statuses/{id}", transactionStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean transactionStatusExistsInEs = transactionStatusSearchRepository.exists(transactionStatus.getId());
        assertThat(transactionStatusExistsInEs).isFalse();

        // Validate the database is empty
        List<TransactionStatus> transactionStatusList = transactionStatusRepository.findAll();
        assertThat(transactionStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTransactionStatus() throws Exception {
        // Initialize the database
        transactionStatusRepository.saveAndFlush(transactionStatus);
        transactionStatusSearchRepository.save(transactionStatus);

        // Search the transactionStatus
        restTransactionStatusMockMvc.perform(get("/api/_search/transaction-statuses?query=id:" + transactionStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionId").value(hasItem(DEFAULT_TRANSACTION_ID.toString())))
            .andExpect(jsonPath("$.[*].transactionSuccess").value(hasItem(DEFAULT_TRANSACTION_SUCCESS.booleanValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].errorCode").value(hasItem(DEFAULT_ERROR_CODE.toString())))
            .andExpect(jsonPath("$.[*].errorMessage").value(hasItem(DEFAULT_ERROR_MESSAGE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionStatus.class);
    }
}
