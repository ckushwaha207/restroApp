package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.MenuCategoryDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity MenuCategory and its DTO MenuCategoryDTO.
 */
@Mapper(componentModel = "spring", uses = {MenuMapper.class, })
public interface MenuCategoryMapper {

    @Mapping(source = "menu.id", target = "menuId")
    @Mapping(source = "menu.name", target = "menuName")
    MenuCategoryDTO menuCategoryToMenuCategoryDTO(MenuCategory menuCategory);

    List<MenuCategoryDTO> menuCategoriesToMenuCategoryDTOs(List<MenuCategory> menuCategories);

    @Mapping(target = "items", ignore = true)
    @Mapping(source = "menuId", target = "menu")
    MenuCategory menuCategoryDTOToMenuCategory(MenuCategoryDTO menuCategoryDTO);

    List<MenuCategory> menuCategoryDTOsToMenuCategories(List<MenuCategoryDTO> menuCategoryDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default MenuCategory menuCategoryFromId(Long id) {
        if (id == null) {
            return null;
        }
        MenuCategory menuCategory = new MenuCategory();
        menuCategory.setId(id);
        return menuCategory;
    }
    

}
