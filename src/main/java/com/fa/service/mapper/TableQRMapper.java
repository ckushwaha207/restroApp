package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.TableQRDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity TableQR and its DTO TableQRDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TableQRMapper {

    @Mapping(source = "table.id", target = "tableId")
    @Mapping(source = "table.code", target = "tableCode")
    @Mapping(source = "store.id", target = "storeId")
    @Mapping(source = "store.code", target = "storeCode")
    TableQRDTO tableQRToTableQRDTO(TableQR tableQR);

    List<TableQRDTO> tableQRSToTableQRDTOs(List<TableQR> tableQRS);

    @Mapping(source = "tableId", target = "table")
    @Mapping(source = "storeId", target = "store")
    TableQR tableQRDTOToTableQR(TableQRDTO tableQRDTO);

    List<TableQR> tableQRDTOsToTableQRS(List<TableQRDTO> tableQRDTOs);

    default DiningTable diningTableFromId(Long id) {
        if (id == null) {
            return null;
        }
        DiningTable diningTable = new DiningTable();
        diningTable.setId(id);
        return diningTable;
    }

    default Store storeFromId(Long id) {
        if (id == null) {
            return null;
        }
        Store store = new Store();
        store.setId(id);
        return store;
    }
}
