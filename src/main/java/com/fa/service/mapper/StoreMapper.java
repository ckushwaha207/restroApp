package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.StoreDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Store and its DTO StoreDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, OrganizationMapper.class, StoreGroupMapper.class, })
public interface StoreMapper {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "organization.id", target = "organizationId")
    @Mapping(source = "storeGroup.id", target = "storeGroupId")
    StoreDTO storeToStoreDTO(Store store);

    List<StoreDTO> storesToStoreDTOs(List<Store> stores);

    @Mapping(source = "locationId", target = "location")
    @Mapping(target = "tables", ignore = true)
    @Mapping(source = "organizationId", target = "organization")
    @Mapping(source = "storeGroupId", target = "storeGroup")
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
    

}
