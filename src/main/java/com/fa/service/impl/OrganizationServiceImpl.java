package com.fa.service.impl;

import com.fa.service.OrganizationService;
import com.fa.domain.Organization;
import com.fa.repository.OrganizationRepository;
import com.fa.repository.search.OrganizationSearchRepository;
import com.fa.service.dto.OrganizationDTO;
import com.fa.service.mapper.OrganizationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Organization.
 */
@Service
@Transactional
public class OrganizationServiceImpl implements OrganizationService{

    private final Logger log = LoggerFactory.getLogger(OrganizationServiceImpl.class);
    
    private final OrganizationRepository organizationRepository;

    private final OrganizationMapper organizationMapper;

    private final OrganizationSearchRepository organizationSearchRepository;

    public OrganizationServiceImpl(OrganizationRepository organizationRepository, OrganizationMapper organizationMapper, OrganizationSearchRepository organizationSearchRepository) {
        this.organizationRepository = organizationRepository;
        this.organizationMapper = organizationMapper;
        this.organizationSearchRepository = organizationSearchRepository;
    }

    /**
     * Save a organization.
     *
     * @param organizationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrganizationDTO save(OrganizationDTO organizationDTO) {
        log.debug("Request to save Organization : {}", organizationDTO);
        Organization organization = organizationMapper.organizationDTOToOrganization(organizationDTO);
        organization = organizationRepository.save(organization);
        OrganizationDTO result = organizationMapper.organizationToOrganizationDTO(organization);
        organizationSearchRepository.save(organization);
        return result;
    }

    /**
     *  Get all the organizations.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrganizationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Organizations");
        Page<Organization> result = organizationRepository.findAll(pageable);
        return result.map(organization -> organizationMapper.organizationToOrganizationDTO(organization));
    }

    /**
     *  Get one organization by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrganizationDTO findOne(Long id) {
        log.debug("Request to get Organization : {}", id);
        Organization organization = organizationRepository.findOne(id);
        OrganizationDTO organizationDTO = organizationMapper.organizationToOrganizationDTO(organization);
        return organizationDTO;
    }

    /**
     *  Delete the  organization by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Organization : {}", id);
        organizationRepository.delete(id);
        organizationSearchRepository.delete(id);
    }

    /**
     * Search for the organization corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrganizationDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Organizations for query {}", query);
        Page<Organization> result = organizationSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(organization -> organizationMapper.organizationToOrganizationDTO(organization));
    }
}
