package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.BusinessUserDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity BusinessUser and its DTO BusinessUserDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, StoreGroupMapper.class, StoreMapper.class, })
public interface BusinessUserMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "storeGroup.id", target = "storeGroupId")
    @Mapping(source = "store.id", target = "storeId")
    @Mapping(source = "store.name", target = "storeName")
    BusinessUserDTO businessUserToBusinessUserDTO(BusinessUser businessUser);

    List<BusinessUserDTO> businessUsersToBusinessUserDTOs(List<BusinessUser> businessUsers);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "storeGroup", ignore = true)
    @Mapping(source = "storeId", target = "store")
    BusinessUser businessUserDTOToBusinessUser(BusinessUserDTO businessUserDTO);

    List<BusinessUser> businessUserDTOsToBusinessUsers(List<BusinessUserDTO> businessUserDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default BusinessUser businessUserFromId(Long id) {
        if (id == null) {
            return null;
        }
        BusinessUser businessUser = new BusinessUser();
        businessUser.setId(id);
        return businessUser;
    }
}
