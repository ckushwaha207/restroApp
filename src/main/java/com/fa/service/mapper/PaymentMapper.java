package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.PaymentDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Payment and its DTO PaymentDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderMapper.class, })
public interface PaymentMapper {

    @Mapping(source = "order.id", target = "orderId")
    PaymentDTO paymentToPaymentDTO(Payment payment);

    List<PaymentDTO> paymentsToPaymentDTOs(List<Payment> payments);

    @Mapping(target = "authorizationStatuses", ignore = true)
    @Mapping(source = "orderId", target = "order")
    Payment paymentDTOToPayment(PaymentDTO paymentDTO);

    List<Payment> paymentDTOsToPayments(List<PaymentDTO> paymentDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Payment paymentFromId(Long id) {
        if (id == null) {
            return null;
        }
        Payment payment = new Payment();
        payment.setId(id);
        return payment;
    }
    

}
