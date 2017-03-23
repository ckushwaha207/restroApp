package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.TransactionStatusDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity TransactionStatus and its DTO TransactionStatusDTO.
 */
@Mapper(componentModel = "spring", uses = {PaymentMapper.class, })
public interface TransactionStatusMapper {

    @Mapping(source = "payment.id", target = "paymentId")
    TransactionStatusDTO transactionStatusToTransactionStatusDTO(TransactionStatus transactionStatus);

    List<TransactionStatusDTO> transactionStatusesToTransactionStatusDTOs(List<TransactionStatus> transactionStatuses);

    @Mapping(source = "paymentId", target = "payment")
    TransactionStatus transactionStatusDTOToTransactionStatus(TransactionStatusDTO transactionStatusDTO);

    List<TransactionStatus> transactionStatusDTOsToTransactionStatuses(List<TransactionStatusDTO> transactionStatusDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default TransactionStatus transactionStatusFromId(Long id) {
        if (id == null) {
            return null;
        }
        TransactionStatus transactionStatus = new TransactionStatus();
        transactionStatus.setId(id);
        return transactionStatus;
    }
    

}
