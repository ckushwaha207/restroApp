package com.fa.service.impl;

import com.fa.service.MenuCategoryService;
import com.fa.domain.MenuCategory;
import com.fa.repository.MenuCategoryRepository;
import com.fa.repository.search.MenuCategorySearchRepository;
import com.fa.service.dto.MenuCategoryDTO;
import com.fa.service.mapper.MenuCategoryMapper;
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
 * Service Implementation for managing MenuCategory.
 */
@Service
@Transactional
public class MenuCategoryServiceImpl implements MenuCategoryService{

    private final Logger log = LoggerFactory.getLogger(MenuCategoryServiceImpl.class);
    
    private final MenuCategoryRepository menuCategoryRepository;

    private final MenuCategoryMapper menuCategoryMapper;

    private final MenuCategorySearchRepository menuCategorySearchRepository;

    public MenuCategoryServiceImpl(MenuCategoryRepository menuCategoryRepository, MenuCategoryMapper menuCategoryMapper, MenuCategorySearchRepository menuCategorySearchRepository) {
        this.menuCategoryRepository = menuCategoryRepository;
        this.menuCategoryMapper = menuCategoryMapper;
        this.menuCategorySearchRepository = menuCategorySearchRepository;
    }

    /**
     * Save a menuCategory.
     *
     * @param menuCategoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MenuCategoryDTO save(MenuCategoryDTO menuCategoryDTO) {
        log.debug("Request to save MenuCategory : {}", menuCategoryDTO);
        MenuCategory menuCategory = menuCategoryMapper.menuCategoryDTOToMenuCategory(menuCategoryDTO);
        menuCategory = menuCategoryRepository.save(menuCategory);
        MenuCategoryDTO result = menuCategoryMapper.menuCategoryToMenuCategoryDTO(menuCategory);
        menuCategorySearchRepository.save(menuCategory);
        return result;
    }

    /**
     *  Get all the menuCategories.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MenuCategoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all MenuCategories");
        Page<MenuCategory> result = menuCategoryRepository.findAll(pageable);
        return result.map(menuCategory -> menuCategoryMapper.menuCategoryToMenuCategoryDTO(menuCategory));
    }

    /**
     *  Get one menuCategory by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MenuCategoryDTO findOne(Long id) {
        log.debug("Request to get MenuCategory : {}", id);
        MenuCategory menuCategory = menuCategoryRepository.findOne(id);
        MenuCategoryDTO menuCategoryDTO = menuCategoryMapper.menuCategoryToMenuCategoryDTO(menuCategory);
        return menuCategoryDTO;
    }

    /**
     *  Delete the  menuCategory by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MenuCategory : {}", id);
        menuCategoryRepository.delete(id);
        menuCategorySearchRepository.delete(id);
    }

    /**
     * Search for the menuCategory corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MenuCategoryDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of MenuCategories for query {}", query);
        Page<MenuCategory> result = menuCategorySearchRepository.search(queryStringQuery(query), pageable);
        return result.map(menuCategory -> menuCategoryMapper.menuCategoryToMenuCategoryDTO(menuCategory));
    }
}
