package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.TransactionStatusDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity TransactionStatus and its DTO TransactionStatusDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransactionStatusMapper {

    @Mapping(source = "payment.id", target = "paymentId")
    TransactionStatusDTO transactionStatusToTransactionStatusDTO(TransactionStatus transactionStatus);

    List<TransactionStatusDTO> transactionStatusesToTransactionStatusDTOs(List<TransactionStatus> transactionStatuses);

    @Mapping(source = "paymentId", target = "payment")
    TransactionStatus transactionStatusDTOToTransactionStatus(TransactionStatusDTO transactionStatusDTO);

    List<TransactionStatus> transactionStatusDTOsToTransactionStatuses(List<TransactionStatusDTO> transactionStatusDTOs);

    default Payment paymentFromId(Long id) {
        if (id == null) {
            return null;
        }
        Payment payment = new Payment();
        payment.setId(id);
        return payment;
    }
}
