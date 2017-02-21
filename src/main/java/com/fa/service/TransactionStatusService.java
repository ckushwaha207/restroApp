package com.fa.service;

import com.fa.service.dto.TransactionStatusDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing TransactionStatus.
 */
public interface TransactionStatusService {

    /**
     * Save a transactionStatus.
     *
     * @param transactionStatusDTO the entity to save
     * @return the persisted entity
     */
    TransactionStatusDTO save(TransactionStatusDTO transactionStatusDTO);

    /**
     *  Get all the transactionStatuses.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<TransactionStatusDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" transactionStatus.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    TransactionStatusDTO findOne(Long id);

    /**
     *  Delete the "id" transactionStatus.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the transactionStatus corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<TransactionStatusDTO> search(String query, Pageable pageable);
}
