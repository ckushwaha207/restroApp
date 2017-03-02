package com.fa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.fa.domain.enumeration.ItemState;

/**
 * A DTO for the CommerceItem entity.
 */
public class CommerceItemDTO implements Serializable {

    private Long id;

    private Integer quantity;

    private ItemState state;

    private String stateDetail;

    private Double totalPrice;

    private Long productId;

    private String productName;

    private Long orderId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public ItemState getState() {
        return state;
    }

    public void setState(ItemState state) {
        this.state = state;
    }
    public String getStateDetail() {
        return stateDetail;
    }

    public void setStateDetail(String stateDetail) {
        this.stateDetail = stateDetail;
    }
    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long menuItemId) {
        this.productId = menuItemId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String menuItemName) {
        this.productName = menuItemName;
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

        CommerceItemDTO commerceItemDTO = (CommerceItemDTO) o;

        if ( ! Objects.equals(id, commerceItemDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "CommerceItemDTO{" +
            "id=" + id +
            ", quantity='" + quantity + "'" +
            ", state='" + state + "'" +
            ", stateDetail='" + stateDetail + "'" +
            ", totalPrice='" + totalPrice + "'" +
            '}';
    }
}
