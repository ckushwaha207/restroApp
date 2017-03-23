package com.fa.service.impl;

import com.fa.service.CommerceItemService;
import com.fa.domain.CommerceItem;
import com.fa.repository.CommerceItemRepository;
import com.fa.repository.search.CommerceItemSearchRepository;
import com.fa.service.dto.CommerceItemDTO;
import com.fa.service.mapper.CommerceItemMapper;
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
 * Service Implementation for managing CommerceItem.
 */
@Service
@Transactional
public class CommerceItemServiceImpl implements CommerceItemService{

    private final Logger log = LoggerFactory.getLogger(CommerceItemServiceImpl.class);
    
    private final CommerceItemRepository commerceItemRepository;

    private final CommerceItemMapper commerceItemMapper;

    private final CommerceItemSearchRepository commerceItemSearchRepository;

    public CommerceItemServiceImpl(CommerceItemRepository commerceItemRepository, CommerceItemMapper commerceItemMapper, CommerceItemSearchRepository commerceItemSearchRepository) {
        this.commerceItemRepository = commerceItemRepository;
        this.commerceItemMapper = commerceItemMapper;
        this.commerceItemSearchRepository = commerceItemSearchRepository;
    }

    /**
     * Save a commerceItem.
     *
     * @param commerceItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CommerceItemDTO save(CommerceItemDTO commerceItemDTO) {
        log.debug("Request to save CommerceItem : {}", commerceItemDTO);
        CommerceItem commerceItem = commerceItemMapper.commerceItemDTOToCommerceItem(commerceItemDTO);
        commerceItem = commerceItemRepository.save(commerceItem);
        CommerceItemDTO result = commerceItemMapper.commerceItemToCommerceItemDTO(commerceItem);
        commerceItemSearchRepository.save(commerceItem);
        return result;
    }

    /**
     *  Get all the commerceItems.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CommerceItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CommerceItems");
        Page<CommerceItem> result = commerceItemRepository.findAll(pageable);
        return result.map(commerceItem -> commerceItemMapper.commerceItemToCommerceItemDTO(commerceItem));
    }

    /**
     *  Get one commerceItem by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CommerceItemDTO findOne(Long id) {
        log.debug("Request to get CommerceItem : {}", id);
        CommerceItem commerceItem = commerceItemRepository.findOne(id);
        CommerceItemDTO commerceItemDTO = commerceItemMapper.commerceItemToCommerceItemDTO(commerceItem);
        return commerceItemDTO;
    }

    /**
     *  Delete the  commerceItem by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CommerceItem : {}", id);
        commerceItemRepository.delete(id);
        commerceItemSearchRepository.delete(id);
    }

    /**
     * Search for the commerceItem corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CommerceItemDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of CommerceItems for query {}", query);
        Page<CommerceItem> result = commerceItemSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(commerceItem -> commerceItemMapper.commerceItemToCommerceItemDTO(commerceItem));
    }
}
