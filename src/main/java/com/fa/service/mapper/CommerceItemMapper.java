package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.CommerceItemDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity CommerceItem and its DTO CommerceItemDTO.
 */
@Mapper(componentModel = "spring", uses = {MenuItemMapper.class, OrderMapper.class, })
public interface CommerceItemMapper {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "order.id", target = "orderId")
    CommerceItemDTO commerceItemToCommerceItemDTO(CommerceItem commerceItem);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "orderId", target = "order")
    CommerceItem commerceItemDTOToCommerceItem(CommerceItemDTO commerceItemDTO);

    List<CommerceItem> commerceItemDTOsToCommerceItems(List<CommerceItemDTO> commerceItemDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default CommerceItem commerceItemFromId(Long id) {
        if (id == null) {
            return null;
        }
        CommerceItem commerceItem = new CommerceItem();
        commerceItem.setId(id);
        return commerceItem;
    }
}
