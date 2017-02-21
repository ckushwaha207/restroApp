package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.PaymentDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Payment and its DTO PaymentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaymentMapper {

    @Mapping(source = "order.id", target = "orderId")
    PaymentDTO paymentToPaymentDTO(Payment payment);

    List<PaymentDTO> paymentsToPaymentDTOs(List<Payment> payments);

    @Mapping(target = "authorizationStatuses", ignore = true)
    @Mapping(source = "orderId", target = "order")
    Payment paymentDTOToPayment(PaymentDTO paymentDTO);

    List<Payment> paymentDTOsToPayments(List<PaymentDTO> paymentDTOs);

    default Order orderFromId(Long id) {
        if (id == null) {
            return null;
        }
        Order order = new Order();
        order.setId(id);
        return order;
    }
}
