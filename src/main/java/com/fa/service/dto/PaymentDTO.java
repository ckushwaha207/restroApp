package com.fa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.fa.domain.enumeration.PaymentMethod;
import com.fa.domain.enumeration.PaymentState;

/**
 * A DTO for the Payment entity.
 */
public class PaymentDTO implements Serializable {

    private Long id;

    private PaymentMethod method;

    private PaymentState state;

    private Double amount;

    private Double authorizedAmount;

    private Long orderId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public PaymentMethod getMethod() {
        return method;
    }

    public void setMethod(PaymentMethod method) {
        this.method = method;
    }
    public PaymentState getState() {
        return state;
    }

    public void setState(PaymentState state) {
        this.state = state;
    }
    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public Double getAuthorizedAmount() {
        return authorizedAmount;
    }

    public void setAuthorizedAmount(Double authorizedAmount) {
        this.authorizedAmount = authorizedAmount;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PaymentDTO paymentDTO = (PaymentDTO) o;

        if ( ! Objects.equals(id, paymentDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "PaymentDTO{" +
            "id=" + id +
            ", method='" + method + "'" +
            ", state='" + state + "'" +
            ", amount='" + amount + "'" +
            ", authorizedAmount='" + authorizedAmount + "'" +
            '}';
    }
}
