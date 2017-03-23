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
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Order orderFromId(Long id) {
        if (id == null) {
            return null;
        }
        Order order = new Order();
        order.setId(id);
        return order;
    }
    

}
