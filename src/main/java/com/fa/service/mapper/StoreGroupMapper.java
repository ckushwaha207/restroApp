package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.StoreGroupDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity StoreGroup and its DTO StoreGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganizationMapper.class, })
public interface StoreGroupMapper {

    @Mapping(source = "organization.id", target = "organizationId")
    StoreGroupDTO storeGroupToStoreGroupDTO(StoreGroup storeGroup);

    List<StoreGroupDTO> storeGroupsToStoreGroupDTOs(List<StoreGroup> storeGroups);

    @Mapping(target = "stores", ignore = true)
    @Mapping(source = "organizationId", target = "organization")
    @Mapping(target = "user", ignore = true)
    StoreGroup storeGroupDTOToStoreGroup(StoreGroupDTO storeGroupDTO);

    List<StoreGroup> storeGroupDTOsToStoreGroups(List<StoreGroupDTO> storeGroupDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default StoreGroup storeGroupFromId(Long id) {
        if (id == null) {
            return null;
        }
        StoreGroup storeGroup = new StoreGroup();
        storeGroup.setId(id);
        return storeGroup;
    }
    

}
