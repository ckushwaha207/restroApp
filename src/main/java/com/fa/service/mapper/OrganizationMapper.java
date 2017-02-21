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
}
