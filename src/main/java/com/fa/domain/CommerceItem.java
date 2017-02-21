package com.fa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import com.fa.domain.enumeration.ItemState;

/**
 * A CommerceItem.
 */
@Entity
@Table(name = "commerce_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "commerceitem")
public class CommerceItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private ItemState state;

    @Column(name = "state_detail")
    private String stateDetail;

    @Column(name = "total_price")
    private Double totalPrice;

    @OneToOne
    @JoinColumn(unique = true)
    private MenuItem product;

    @ManyToOne
    private Order order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public CommerceItem quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ItemState getState() {
        return state;
    }

    public CommerceItem state(ItemState state) {
        this.state = state;
        return this;
    }

    public void setState(ItemState state) {
        this.state = state;
    }

    public String getStateDetail() {
        return stateDetail;
    }

    public CommerceItem stateDetail(String stateDetail) {
        this.stateDetail = stateDetail;
        return this;
    }

    public void setStateDetail(String stateDetail) {
        this.stateDetail = stateDetail;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public CommerceItem totalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public MenuItem getProduct() {
        return product;
    }

    public CommerceItem product(MenuItem menuItem) {
        this.product = menuItem;
        return this;
    }

    public void setProduct(MenuItem menuItem) {
        this.product = menuItem;
    }

    public Order getOrder() {
        return order;
    }

    public CommerceItem order(Order order) {
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
        CommerceItem commerceItem = (CommerceItem) o;
        if (commerceItem.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, commerceItem.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "CommerceItem{" +
            "id=" + id +
            ", quantity='" + quantity + "'" +
            ", state='" + state + "'" +
            ", stateDetail='" + stateDetail + "'" +
            ", totalPrice='" + totalPrice + "'" +
            '}';
    }
}
