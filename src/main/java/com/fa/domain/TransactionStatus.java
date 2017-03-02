package com.fa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TransactionStatus.
 */
@Entity
@Table(name = "transaction_status")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "transactionstatus")
public class TransactionStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "transaction_id", nullable = false)
    private String transactionId;

    @Column(name = "transaction_success")
    private Boolean transactionSuccess;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "error_code")
    private String errorCode;

    @Column(name = "error_message")
    private String errorMessage;

    @ManyToOne
    private Payment payment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public TransactionStatus transactionId(String transactionId) {
        this.transactionId = transactionId;
        return this;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public Boolean isTransactionSuccess() {
        return transactionSuccess;
    }

    public TransactionStatus transactionSuccess(Boolean transactionSuccess) {
        this.transactionSuccess = transactionSuccess;
        return this;
    }

    public void setTransactionSuccess(Boolean transactionSuccess) {
        this.transactionSuccess = transactionSuccess;
    }

    public Double getAmount() {
        return amount;
    }

    public TransactionStatus amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public TransactionStatus errorCode(String errorCode) {
        this.errorCode = errorCode;
        return this;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public TransactionStatus errorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
        return this;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Payment getPayment() {
        return payment;
    }

    public TransactionStatus payment(Payment payment) {
        this.payment = payment;
        return this;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TransactionStatus transactionStatus = (TransactionStatus) o;
        if (transactionStatus.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, transactionStatus.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "TransactionStatus{" +
            "id=" + id +
            ", transactionId='" + transactionId + "'" +
            ", transactionSuccess='" + transactionSuccess + "'" +
            ", amount='" + amount + "'" +
            ", errorCode='" + errorCode + "'" +
            ", errorMessage='" + errorMessage + "'" +
            '}';
    }
}
