package com.fa.service.impl;

import com.fa.service.DiningTableService;
import com.fa.domain.DiningTable;
import com.fa.repository.DiningTableRepository;
import com.fa.repository.search.DiningTableSearchRepository;
import com.fa.service.dto.DiningTableDTO;
import com.fa.service.mapper.DiningTableMapper;
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
 * Service Implementation for managing DiningTable.
 */
@Service
@Transactional
public class DiningTableServiceImpl implements DiningTableService{

    private final Logger log = LoggerFactory.getLogger(DiningTableServiceImpl.class);
    
    private final DiningTableRepository diningTableRepository;

    private final DiningTableMapper diningTableMapper;

    private final DiningTableSearchRepository diningTableSearchRepository;

    public DiningTableServiceImpl(DiningTableRepository diningTableRepository, DiningTableMapper diningTableMapper, DiningTableSearchRepository diningTableSearchRepository) {
        this.diningTableRepository = diningTableRepository;
        this.diningTableMapper = diningTableMapper;
        this.diningTableSearchRepository = diningTableSearchRepository;
    }

    /**
     * Save a diningTable.
     *
     * @param diningTableDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DiningTableDTO save(DiningTableDTO diningTableDTO) {
        log.debug("Request to save DiningTable : {}", diningTableDTO);
        DiningTable diningTable = diningTableMapper.diningTableDTOToDiningTable(diningTableDTO);
        diningTable = diningTableRepository.save(diningTable);
        DiningTableDTO result = diningTableMapper.diningTableToDiningTableDTO(diningTable);
        diningTableSearchRepository.save(diningTable);
        return result;
    }

    /**
     *  Get all the diningTables.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DiningTableDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DiningTables");
        Page<DiningTable> result = diningTableRepository.findAll(pageable);
        return result.map(diningTable -> diningTableMapper.diningTableToDiningTableDTO(diningTable));
    }

    /**
     *  Get one diningTable by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DiningTableDTO findOne(Long id) {
        log.debug("Request to get DiningTable : {}", id);
        DiningTable diningTable = diningTableRepository.findOne(id);
        DiningTableDTO diningTableDTO = diningTableMapper.diningTableToDiningTableDTO(diningTable);
        return diningTableDTO;
    }

    /**
     *  Delete the  diningTable by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DiningTable : {}", id);
        diningTableRepository.delete(id);
        diningTableSearchRepository.delete(id);
    }

    /**
     * Search for the diningTable corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DiningTableDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of DiningTables for query {}", query);
        Page<DiningTable> result = diningTableSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(diningTable -> diningTableMapper.diningTableToDiningTableDTO(diningTable));
    }
}
