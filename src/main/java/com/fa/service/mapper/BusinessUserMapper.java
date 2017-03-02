package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.BusinessUserDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity BusinessUser and its DTO BusinessUserDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface BusinessUserMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "storeGroup.id", target = "storeGroupId")
    @Mapping(source = "store.id", target = "storeId")
    @Mapping(source = "store.name", target = "storeName")
    BusinessUserDTO businessUserToBusinessUserDTO(BusinessUser businessUser);

    List<BusinessUserDTO> businessUsersToBusinessUserDTOs(List<BusinessUser> businessUsers);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "storeGroupId", target = "storeGroup")
    @Mapping(source = "storeId", target = "store")
    BusinessUser businessUserDTOToBusinessUser(BusinessUserDTO businessUserDTO);

    List<BusinessUser> businessUserDTOsToBusinessUsers(List<BusinessUserDTO> businessUserDTOs);

    default StoreGroup storeGroupFromId(Long id) {
        if (id == null) {
            return null;
        }
        StoreGroup storeGroup = new StoreGroup();
        storeGroup.setId(id);
        return storeGroup;
    }

    default Store storeFromId(Long id) {
        if (id == null) {
            return null;
        }
        Store store = new Store();
        store.setId(id);
        return store;
    }
}
