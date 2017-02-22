package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.MenuCategoryDTO;
import com.fa.service.dto.MenuDTO;

import com.fa.service.dto.MenuItemDTO;
import org.mapstruct.*;
import java.util.List;
import java.util.Set;

/**
 * Mapper for the entity Menu and its DTO MenuDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MenuMapper {

    @Mapping(source = "store.id", target = "storeId")
    MenuDTO menuToMenuDTO(Menu menu);

    List<MenuDTO> menusToMenuDTOs(List<Menu> menus);

    @Mapping(target = "categories", ignore = true)
    @Mapping(source = "storeId", target = "store")
    Menu menuDTOToMenu(MenuDTO menuDTO);

    List<Menu> menuDTOsToMenus(List<MenuDTO> menuDTOs);

    default Store storeFromId(Long id) {
        if (id == null) {
            return null;
        }
        Store store = new Store();
        store.setId(id);
        return store;
    }

    // mapping for menu-categories

    @Mappings({
        @Mapping(target = "menuId", source = "menu.id"),
        @Mapping(target = "menuName", source = "menu.name"),
    })
    MenuCategoryDTO menuCategoryToMenuCategoryDTO(MenuCategory menuCategory);

    List<MenuCategoryDTO> menuCategoriesToMenuCategoryDTOs(Set<MenuCategory> menuCategories);

    // mapping for menu-items

    @Mappings({
        @Mapping(target = "categoryId", source = "category.id"),
        @Mapping(target = "categoryName", source = "category.name")
    })
    MenuItemDTO menuItemToMenuItemDTO(MenuItem menuItem);

    List<MenuItemDTO> menuItemsToMenuItemDTOs(Set<MenuItem> menuItems);
}
