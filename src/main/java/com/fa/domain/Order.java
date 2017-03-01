package com.fa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.fa.domain.enumeration.OrderState;

/**
 * A Order.
 */
@Entity
@Table(name = "pa_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hilo_sequence_generator")
    @GenericGenerator(
        name = "hilo_sequence_generator",
        strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
        parameters = {
            @org.hibernate.annotations.Parameter(name = "sequence_name", value = "hilo_seqeunce"),
            @org.hibernate.annotations.Parameter(name = "initial_value", value = "ORD000000"),
            @org.hibernate.annotations.Parameter(name = "increment_size", value = "1"),
            @org.hibernate.annotations.Parameter(name = "optimizer", value = "hilo")
        }
    )
    private String orderNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private OrderState state;

    @Column(name = "total")
    private Double total;

    @Column(name = "sub_total")
    private Double subTotal;

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CommerceItem> items = new HashSet<>();

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Payment> payments = new HashSet<>();

    @ManyToOne
    private User profile;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public Order orderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public OrderState getState() {
        return state;
    }

    public Order state(OrderState state) {
        this.state = state;
        return this;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public Double getTotal() {
        return total;
    }

    public Order total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Double getSubTotal() {
        return subTotal;
    }

    public Order subTotal(Double subTotal) {
        this.subTotal = subTotal;
        return this;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }

    public Set<CommerceItem> getItems() {
        return items;
    }

    public Order items(Set<CommerceItem> commerceItems) {
        this.items = commerceItems;
        return this;
    }

    public Order addItems(CommerceItem commerceItem) {
        this.items.add(commerceItem);
        commerceItem.setOrder(this);
        return this;
    }

    public Order removeItems(CommerceItem commerceItem) {
        this.items.remove(commerceItem);
        commerceItem.setOrder(null);
        return this;
    }

    public void setItems(Set<CommerceItem> commerceItems) {
        this.items = commerceItems;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public Order payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public Order addPayments(Payment payment) {
        this.payments.add(payment);
        payment.setOrder(this);
        return this;
    }

    public Order removePayments(Payment payment) {
        this.payments.remove(payment);
        payment.setOrder(null);
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public User getProfile() {
        return profile;
    }

    public Order profile(User user) {
        this.profile = user;
        return this;
    }

    public void setProfile(User user) {
        this.profile = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Order order = (Order) o;
        if (order.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, order.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + id +
            ", orderNumber='" + orderNumber + "'" +
            ", state='" + state + "'" +
            ", total='" + total + "'" +
            ", subTotal='" + subTotal + "'" +
            '}';
    }
}
