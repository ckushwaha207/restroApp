package com.fa.service.mapper.impl;

import com.fa.domain.Store;
import com.fa.service.dto.StoreDTO;
import com.fa.service.mapper.StoreMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 * Created by chandan.kushwaha on 21-02-2017.
 */
public abstract class StoreMapperDecorator implements StoreMapper {
    @Autowired
    @Qualifier("delegate")
    private StoreMapper delegate;

    @Override
    public StoreDTO storeToStoreDTO(Store store) {
        StoreDTO dto = delegate.storeToStoreDTO(store);
        dto.setAddress(store.getLocation().getAddress1() + ", " + store.getLocation().getCity());
        return dto;
    }
}
