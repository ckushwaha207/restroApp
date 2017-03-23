package com.fa.service.impl;

import com.fa.domain.MenuItem;
import com.fa.domain.enumeration.ItemState;
import com.fa.service.CommerceItemService;
import com.fa.domain.CommerceItem;
import com.fa.repository.CommerceItemRepository;
import com.fa.repository.search.CommerceItemSearchRepository;
import com.fa.service.MenuItemService;
import com.fa.service.MenuService;
import com.fa.service.dto.CommerceItemDTO;
import com.fa.service.dto.MenuItemDTO;
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

    private final MenuItemService menuItemService;

    public CommerceItemServiceImpl(CommerceItemRepository commerceItemRepository, CommerceItemMapper commerceItemMapper, CommerceItemSearchRepository commerceItemSearchRepository, MenuItemService menuItemService) {
        this.commerceItemRepository = commerceItemRepository;
        this.commerceItemMapper = commerceItemMapper;
        this.commerceItemSearchRepository = commerceItemSearchRepository;
        this.menuItemService = menuItemService;
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
        CommerceItemDTO result = null;
        CommerceItem commerceItem = commerceItemMapper.commerceItemDTOToCommerceItem(commerceItemDTO);

        CommerceItem existingCommerceItem = commerceItemRepository.findOneByOrderIdAndProductId(commerceItem.getOrder().getId(), commerceItem.getProduct().getId());
        if(existingCommerceItem == null) {
            // check product exist
            MenuItemDTO product = menuItemService.findOne(commerceItem.getProduct().getId());
            if (product == null) {
                return null;
            } else {
                commerceItem.setTotalPrice(product.getPrice() * commerceItem.getQuantity());
                commerceItem.setState(ItemState.INITIAL);
                commerceItem = commerceItemRepository.save(commerceItem);
                result = commerceItemMapper.commerceItemToCommerceItemDTO(commerceItem);
                result.setProductName(product.getName());
                commerceItemSearchRepository.save(commerceItem);
                return result;
            }
        } else {
            existingCommerceItem.setQuantity(commerceItem.getQuantity());
            existingCommerceItem.setTotalPrice(existingCommerceItem.getProduct().getPrice() * commerceItem.getQuantity());
            commerceItem = commerceItemRepository.save(existingCommerceItem);
            result = commerceItemMapper.commerceItemToCommerceItemDTO(commerceItem);
            commerceItemSearchRepository.save(commerceItem);
        }
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
