package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.MenuDTO;

import org.mapstruct.*;
import java.util.List;

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
}
