package com.fa.service.impl;

import com.fa.service.TransactionStatusService;
import com.fa.domain.TransactionStatus;
import com.fa.repository.TransactionStatusRepository;
import com.fa.repository.search.TransactionStatusSearchRepository;
import com.fa.service.dto.TransactionStatusDTO;
import com.fa.service.mapper.TransactionStatusMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TransactionStatus.
 */
@Service
@Transactional
public class TransactionStatusServiceImpl implements TransactionStatusService{

    private final Logger log = LoggerFactory.getLogger(TransactionStatusServiceImpl.class);
    
    private final TransactionStatusRepository transactionStatusRepository;

    private final TransactionStatusMapper transactionStatusMapper;

    private final TransactionStatusSearchRepository transactionStatusSearchRepository;

    public TransactionStatusServiceImpl(TransactionStatusRepository transactionStatusRepository, TransactionStatusMapper transactionStatusMapper, TransactionStatusSearchRepository transactionStatusSearchRepository) {
        this.transactionStatusRepository = transactionStatusRepository;
        this.transactionStatusMapper = transactionStatusMapper;
        this.transactionStatusSearchRepository = transactionStatusSearchRepository;
    }

    /**
     * Save a transactionStatus.
     *
     * @param transactionStatusDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransactionStatusDTO save(TransactionStatusDTO transactionStatusDTO) {
        log.debug("Request to save TransactionStatus : {}", transactionStatusDTO);
        TransactionStatus transactionStatus = transactionStatusMapper.transactionStatusDTOToTransactionStatus(transactionStatusDTO);
        transactionStatus = transactionStatusRepository.save(transactionStatus);
        TransactionStatusDTO result = transactionStatusMapper.transactionStatusToTransactionStatusDTO(transactionStatus);
        transactionStatusSearchRepository.save(transactionStatus);
        return result;
    }

    /**
     *  Get all the transactionStatuses.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TransactionStatusDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TransactionStatuses");
        Page<TransactionStatus> result = transactionStatusRepository.findAll(pageable);
        return result.map(transactionStatus -> transactionStatusMapper.transactionStatusToTransactionStatusDTO(transactionStatus));
    }

    /**
     *  Get one transactionStatus by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TransactionStatusDTO findOne(Long id) {
        log.debug("Request to get TransactionStatus : {}", id);
        TransactionStatus transactionStatus = transactionStatusRepository.findOne(id);
        TransactionStatusDTO transactionStatusDTO = transactionStatusMapper.transactionStatusToTransactionStatusDTO(transactionStatus);
        return transactionStatusDTO;
    }

    /**
     *  Delete the  transactionStatus by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransactionStatus : {}", id);
        transactionStatusRepository.delete(id);
        transactionStatusSearchRepository.delete(id);
    }

    /**
     * Search for the transactionStatus corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TransactionStatusDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TransactionStatuses for query {}", query);
        Page<TransactionStatus> result = transactionStatusSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(transactionStatus -> transactionStatusMapper.transactionStatusToTransactionStatusDTO(transactionStatus));
    }
}
