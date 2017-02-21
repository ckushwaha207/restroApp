package com.fa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.fa.domain.enumeration.PaymentMethod;

import com.fa.domain.enumeration.PaymentState;

/**
 * A Payment.
 */
@Entity
@Table(name = "payment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "payment")
public class Payment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "method")
    private PaymentMethod method;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private PaymentState state;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "authorized_amount")
    private Double authorizedAmount;

    @OneToMany(mappedBy = "payment")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TransactionStatus> authorizationStatuses = new HashSet<>();

    @ManyToOne
    private Order order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PaymentMethod getMethod() {
        return method;
    }

    public Payment method(PaymentMethod method) {
        this.method = method;
        return this;
    }

    public void setMethod(PaymentMethod method) {
        this.method = method;
    }

    public PaymentState getState() {
        return state;
    }

    public Payment state(PaymentState state) {
        this.state = state;
        return this;
    }

    public void setState(PaymentState state) {
        this.state = state;
    }

    public Double getAmount() {
        return amount;
    }

    public Payment amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getAuthorizedAmount() {
        return authorizedAmount;
    }

    public Payment authorizedAmount(Double authorizedAmount) {
        this.authorizedAmount = authorizedAmount;
        return this;
    }

    public void setAuthorizedAmount(Double authorizedAmount) {
        this.authorizedAmount = authorizedAmount;
    }

    public Set<TransactionStatus> getAuthorizationStatuses() {
        return authorizationStatuses;
    }

    public Payment authorizationStatuses(Set<TransactionStatus> transactionStatuses) {
        this.authorizationStatuses = transactionStatuses;
        return this;
    }

    public Payment addAuthorizationStatus(TransactionStatus transactionStatus) {
        this.authorizationStatuses.add(transactionStatus);
        transactionStatus.setPayment(this);
        return this;
    }

    public Payment removeAuthorizationStatus(TransactionStatus transactionStatus) {
        this.authorizationStatuses.remove(transactionStatus);
        transactionStatus.setPayment(null);
        return this;
    }

    public void setAuthorizationStatuses(Set<TransactionStatus> transactionStatuses) {
        this.authorizationStatuses = transactionStatuses;
    }

    public Order getOrder() {
        return order;
    }

    public Payment order(Order order) {
        this.order = order;
        return this;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Payment payment = (Payment) o;
        if (payment.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, payment.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Payment{" +
            "id=" + id +
            ", method='" + method + "'" +
            ", state='" + state + "'" +
            ", amount='" + amount + "'" +
            ", authorizedAmount='" + authorizedAmount + "'" +
            '}';
    }
}
