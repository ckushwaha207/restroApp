package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.MenuItemDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity MenuItem and its DTO MenuItemDTO.
 */
@Mapper(componentModel = "spring", uses = {MenuCategoryMapper.class, })
public interface MenuItemMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    MenuItemDTO menuItemToMenuItemDTO(MenuItem menuItem);

    @Mapping(source = "categoryId", target = "category")
    MenuItem menuItemDTOToMenuItem(MenuItemDTO menuItemDTO);

    List<MenuItem> menuItemDTOsToMenuItems(List<MenuItemDTO> menuItemDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default MenuItem menuItemFromId(Long id) {
        if (id == null) {
            return null;
        }
        MenuItem menuItem = new MenuItem();
        menuItem.setId(id);
        return menuItem;
    }
}
