package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.MenuItemDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity MenuItem and its DTO MenuItemDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MenuItemMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    MenuItemDTO menuItemToMenuItemDTO(MenuItem menuItem);

    List<MenuItemDTO> menuItemsToMenuItemDTOs(List<MenuItem> menuItems);

    @Mapping(source = "categoryId", target = "category")
    MenuItem menuItemDTOToMenuItem(MenuItemDTO menuItemDTO);

    List<MenuItem> menuItemDTOsToMenuItems(List<MenuItemDTO> menuItemDTOs);

    default MenuCategory menuCategoryFromId(Long id) {
        if (id == null) {
            return null;
        }
        MenuCategory menuCategory = new MenuCategory();
        menuCategory.setId(id);
        return menuCategory;
    }
}
