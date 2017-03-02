package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.StoreDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Store and its DTO StoreDTO.
 */
@Mapper(componentModel = "spring", uses = {})
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

    default Location locationFromId(Long id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }

    default Organization organizationFromId(Long id) {
        if (id == null) {
            return null;
        }
        Organization organization = new Organization();
        organization.setId(id);
        return organization;
    }

    default StoreGroup storeGroupFromId(Long id) {
        if (id == null) {
            return null;
        }
        StoreGroup storeGroup = new StoreGroup();
        storeGroup.setId(id);
        return storeGroup;
    }
}
