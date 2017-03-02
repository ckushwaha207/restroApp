package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.OrderDTO;

import org.mapstruct.*;
import java.util.List;

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
}
