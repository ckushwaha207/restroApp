package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.CartDTO;
import com.fa.service.dto.CommerceItemDTO;
import com.fa.service.dto.MenuCategoryDTO;
import com.fa.service.dto.OrderDTO;

import org.mapstruct.*;
import java.util.List;
import java.util.Set;

/**
 * Mapper for the entity Order and its DTO OrderDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface OrderMapper {

    @Mapping(source = "profile.id", target = "profileId")
    @Mapping(source = "profile.login", target = "profileLogin")
    OrderDTO orderToOrderDTO(Order order);

    List<OrderDTO> ordersToOrderDTOs(List<Order> orders);

    @Mapping(target = "items", ignore = true)
    @Mapping(target = "payments", ignore = true)
    @Mapping(source = "profileId", target = "profile")
    Order orderDTOToOrder(OrderDTO orderDTO);

    List<Order> orderDTOsToOrders(List<OrderDTO> orderDTOs);

    // mapping for commerceItems

    @Mappings({
        @Mapping(target = "productId", source = "product.id"),
        @Mapping(target = "productName", source = "product.name"),
        @Mapping(target = "orderId", source = "order.id")
    })
    CommerceItemDTO commerceItemToCommerceItemDTO(CommerceItem commerceItem);

    List<CommerceItemDTO> commerceItemsToCommerceItemDTOs(Set<CommerceItem> commerceItems);
}
