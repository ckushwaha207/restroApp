package com.fa.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.fa.domain.enumeration.OrderState;

/**
 * A DTO for the Order entity.
 */
public class OrderDTO implements Serializable {

    private Long id;

    @NotNull
    private String orderNumber;

    private OrderState state;

    private Double total;

    private Double subTotal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }
    public OrderState getState() {
        return state;
    }

    public void setState(OrderState state) {
        this.state = state;
    }
    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
    public Double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderDTO orderDTO = (OrderDTO) o;

        if ( ! Objects.equals(id, orderDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "OrderDTO{" +
            "id=" + id +
            ", orderNumber='" + orderNumber + "'" +
            ", state='" + state + "'" +
            ", total='" + total + "'" +
            ", subTotal='" + subTotal + "'" +
            '}';
    }
}
