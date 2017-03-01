package com.fa.service.dto;

import java.io.Serializable;
import java.util.Set;

/**
 * A DTO for the Cart entity
 *
 * Created by chandan.kushwaha on 01-03-2017.
 */
public class CartDTO implements Serializable {
    private String code;
    private Long profileId;
    private Set<CartItemDTO> items;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getProfileId() {
        return profileId;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    public Set<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(Set<CartItemDTO> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "CartDTO{" +
            "tableQRCode='" + code + '\'' +
            ", userLogin='" + profileId + '\'' +
            '}';
    }
}
