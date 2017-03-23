package com.fa.service.mapper;

import com.fa.domain.*;
import com.fa.service.dto.OrganizationDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Organization and its DTO OrganizationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrganizationMapper {

    OrganizationDTO organizationToOrganizationDTO(Organization organization);

    List<OrganizationDTO> organizationsToOrganizationDTOs(List<Organization> organizations);

    Organization organizationDTOToOrganization(OrganizationDTO organizationDTO);

    List<Organization> organizationDTOsToOrganizations(List<OrganizationDTO> organizationDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Organization organizationFromId(Long id) {
        if (id == null) {
            return null;
        }
        Organization organization = new Organization();
        organization.setId(id);
        return organization;
    }
    

}
