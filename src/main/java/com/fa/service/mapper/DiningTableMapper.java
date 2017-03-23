package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.DiningTableDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity DiningTable and its DTO DiningTableDTO.
 */
@Mapper(componentModel = "spring", uses = {StoreMapper.class, })
public interface DiningTableMapper {

    @Mapping(source = "store.id", target = "storeId")
    DiningTableDTO diningTableToDiningTableDTO(DiningTable diningTable);

    List<DiningTableDTO> diningTablesToDiningTableDTOs(List<DiningTable> diningTables);

    @Mapping(source = "storeId", target = "store")
    DiningTable diningTableDTOToDiningTable(DiningTableDTO diningTableDTO);

    List<DiningTable> diningTableDTOsToDiningTables(List<DiningTableDTO> diningTableDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default DiningTable diningTableFromId(Long id) {
        if (id == null) {
            return null;
        }
        DiningTable diningTable = new DiningTable();
        diningTable.setId(id);
        return diningTable;
    }
    

}
