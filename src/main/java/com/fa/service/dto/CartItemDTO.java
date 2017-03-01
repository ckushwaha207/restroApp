package com.fa.service.dto;

import java.io.Serializable;

/**
 * Created by chandan.kushwaha on 01-03-2017.
 */
public class CartItemDTO implements Serializable {
    private Long productId;
    private Integer quantity;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "CartItemDTO{" +
            "productId=" + productId +
            ", quantity=" + quantity +
            '}';
    }
}
