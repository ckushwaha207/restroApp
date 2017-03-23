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
@Mapper(componentModel = "spring", uses = {StoreMapper.class, })
public interface MenuMapper {

    @Mapping(source = "store.id", target = "storeId")
    MenuDTO menuToMenuDTO(Menu menu);

    @Mapping(target = "categories", ignore = true)
    @Mapping(source = "storeId", target = "store")
    Menu menuDTOToMenu(MenuDTO menuDTO);

    List<Menu> menuDTOsToMenus(List<MenuDTO> menuDTOs);

    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Menu menuFromId(Long id) {
        if (id == null) {
            return null;
        }
        Menu menu = new Menu();
        menu.setId(id);
        return menu;
    }
}
