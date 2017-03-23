package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.TableQRDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity TableQR and its DTO TableQRDTO.
 */
@Mapper(componentModel = "spring", uses = {DiningTableMapper.class, StoreMapper.class, })
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
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default TableQR tableQRFromId(Long id) {
        if (id == null) {
            return null;
        }
        TableQR tableQR = new TableQR();
        tableQR.setId(id);
        return tableQR;
    }
    

}
