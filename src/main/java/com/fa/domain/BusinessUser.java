package com.fa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A BusinessUser.
 */
@Entity
@Table(name = "business_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "businessuser")
public class BusinessUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne
    @JoinColumn(unique = true)
    private StoreGroup storeGroup;

    @ManyToOne
    private Store store;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public BusinessUser user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public StoreGroup getStoreGroup() {
        return storeGroup;
    }

    public BusinessUser storeGroup(StoreGroup storeGroup) {
        this.storeGroup = storeGroup;
        return this;
    }

    public void setStoreGroup(StoreGroup storeGroup) {
        this.storeGroup = storeGroup;
    }

    public Store getStore() {
        return store;
    }

    public BusinessUser store(Store store) {
        this.store = store;
        return this;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BusinessUser businessUser = (BusinessUser) o;
        if (businessUser.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, businessUser.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "BusinessUser{" +
            "id=" + id +
            '}';
    }
}
