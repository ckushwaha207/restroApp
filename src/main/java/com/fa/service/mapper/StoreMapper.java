package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.*;

import com.fa.service.mapper.impl.StoreMapperDecorator;
import org.mapstruct.*;
import java.util.List;
import java.util.Set;

/**
 * Mapper for the entity Store and its DTO StoreDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, OrganizationMapper.class, StoreGroupMapper.class, })
@DecoratedWith(StoreMapperDecorator.class)
public interface StoreMapper {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "organization.id", target = "organizationId")
    @Mapping(source = "storeGroup.id", target = "storeGroupId")
    @Mapping(target = "address", ignore = true)
    StoreDTO storeToStoreDTO(Store store);

    List<StoreDTO> storesToStoreDTOs(List<Store> stores);

    @Mapping(source = "locationId", target = "location")
    @Mapping(target = "tables", ignore = true)
    @Mapping(source = "organizationId", target = "organization")
    @Mapping(target = "storeGroup", ignore = true)
    @Mapping(target = "menus", ignore = true)
    Store storeDTOToStore(StoreDTO storeDTO);

    List<Store> storeDTOsToStores(List<StoreDTO> storeDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Store storeFromId(Long id) {
        if (id == null) {
            return null;
        }
        Store store = new Store();
        store.setId(id);
        return store;
    }

    default StoreGroup storeGroupFromId(Long id) {
        if (id == null) {
            return null;
        }
        StoreGroup storeGroup = new StoreGroup();
        storeGroup.setId(id);
        return storeGroup;
    }

    // mapping for menus
    @Mappings({
        @Mapping(target = "storeId", source = "store.id"),
    })
    MenuDTO menuToMenuDTO(Menu menu);

    List<MenuDTO> menusToMenuDTOs(Set<Menu> menus);


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
