package com.fa.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TransactionStatus entity.
 */
public class TransactionStatusDTO implements Serializable {

    private Long id;

    @NotNull
    private String transactionId;

    private Boolean transactionSuccess;

    private Double amount;

    private String errorCode;

    private String errorMessage;

    private Long paymentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
    public Boolean getTransactionSuccess() {
        return transactionSuccess;
    }

    public void setTransactionSuccess(Boolean transactionSuccess) {
        this.transactionSuccess = transactionSuccess;
    }
    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransactionStatusDTO transactionStatusDTO = (TransactionStatusDTO) o;

        if ( ! Objects.equals(id, transactionStatusDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "TransactionStatusDTO{" +
            "id=" + id +
            ", transactionId='" + transactionId + "'" +
            ", transactionSuccess='" + transactionSuccess + "'" +
            ", amount='" + amount + "'" +
            ", errorCode='" + errorCode + "'" +
            ", errorMessage='" + errorMessage + "'" +
            '}';
    }
}
