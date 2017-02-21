package com.fa.service;

import com.fa.service.dto.CommerceItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing CommerceItem.
 */
public interface CommerceItemService {

    /**
     * Save a commerceItem.
     *
     * @param commerceItemDTO the entity to save
     * @return the persisted entity
     */
    CommerceItemDTO save(CommerceItemDTO commerceItemDTO);

    /**
     *  Get all the commerceItems.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<CommerceItemDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" commerceItem.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    CommerceItemDTO findOne(Long id);

    /**
     *  Delete the "id" commerceItem.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the commerceItem corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<CommerceItemDTO> search(String query, Pageable pageable);
}
