package com.fa.service;

import com.fa.service.dto.PaymentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Payment.
 */
public interface PaymentService {

    /**
     * Save a payment.
     *
     * @param paymentDTO the entity to save
     * @return the persisted entity
     */
    PaymentDTO save(PaymentDTO paymentDTO);

    /**
     *  Get all the payments.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PaymentDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" payment.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PaymentDTO findOne(Long id);

    /**
     *  Delete the "id" payment.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the payment corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PaymentDTO> search(String query, Pageable pageable);
}
