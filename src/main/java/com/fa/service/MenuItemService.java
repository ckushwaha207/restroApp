package com.fa.service;

import com.fa.service.dto.MenuItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing MenuItem.
 */
public interface MenuItemService {

    /**
     * Save a menuItem.
     *
     * @param menuItemDTO the entity to save
     * @return the persisted entity
     */
    MenuItemDTO save(MenuItemDTO menuItemDTO);

    /**
     *  Get all the menuItems.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<MenuItemDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" menuItem.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    MenuItemDTO findOne(Long id);

    /**
     *  Delete the "id" menuItem.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the menuItem corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<MenuItemDTO> search(String query, Pageable pageable);
}
