package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.CommerceItemDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity CommerceItem and its DTO CommerceItemDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CommerceItemMapper {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "order.id", target = "orderId")
    CommerceItemDTO commerceItemToCommerceItemDTO(CommerceItem commerceItem);

    List<CommerceItemDTO> commerceItemsToCommerceItemDTOs(List<CommerceItem> commerceItems);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "orderId", target = "order")
    CommerceItem commerceItemDTOToCommerceItem(CommerceItemDTO commerceItemDTO);

    List<CommerceItem> commerceItemDTOsToCommerceItems(List<CommerceItemDTO> commerceItemDTOs);

    default MenuItem menuItemFromId(Long id) {
        if (id == null) {
            return null;
        }
        MenuItem menuItem = new MenuItem();
        menuItem.setId(id);
        return menuItem;
    }

    default Order orderFromId(Long id) {
        if (id == null) {
            return null;
        }
        Order order = new Order();
        order.setId(id);
        return order;
    }
}
