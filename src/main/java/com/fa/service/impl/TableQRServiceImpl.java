package com.fa.service.impl;

import com.fa.service.TableQRService;
import com.fa.domain.TableQR;
import com.fa.repository.TableQRRepository;
import com.fa.repository.search.TableQRSearchRepository;
import com.fa.service.dto.TableQRDTO;
import com.fa.service.mapper.TableQRMapper;
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
 * Service Implementation for managing TableQR.
 */
@Service
@Transactional
public class TableQRServiceImpl implements TableQRService{

    private final Logger log = LoggerFactory.getLogger(TableQRServiceImpl.class);
    
    private final TableQRRepository tableQRRepository;

    private final TableQRMapper tableQRMapper;

    private final TableQRSearchRepository tableQRSearchRepository;

    public TableQRServiceImpl(TableQRRepository tableQRRepository, TableQRMapper tableQRMapper, TableQRSearchRepository tableQRSearchRepository) {
        this.tableQRRepository = tableQRRepository;
        this.tableQRMapper = tableQRMapper;
        this.tableQRSearchRepository = tableQRSearchRepository;
    }

    /**
     * Save a tableQR.
     *
     * @param tableQRDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TableQRDTO save(TableQRDTO tableQRDTO) {
        log.debug("Request to save TableQR : {}", tableQRDTO);
        TableQR tableQR = tableQRMapper.tableQRDTOToTableQR(tableQRDTO);
        tableQR = tableQRRepository.save(tableQR);
        TableQRDTO result = tableQRMapper.tableQRToTableQRDTO(tableQR);
        tableQRSearchRepository.save(tableQR);
        return result;
    }

    /**
     *  Get all the tableQRS.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TableQRDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TableQRS");
        Page<TableQR> result = tableQRRepository.findAll(pageable);
        return result.map(tableQR -> tableQRMapper.tableQRToTableQRDTO(tableQR));
    }

    /**
     *  Get one tableQR by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TableQRDTO findOne(Long id) {
        log.debug("Request to get TableQR : {}", id);
        TableQR tableQR = tableQRRepository.findOne(id);
        TableQRDTO tableQRDTO = tableQRMapper.tableQRToTableQRDTO(tableQR);
        return tableQRDTO;
    }

    /**
     *  Delete the  tableQR by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TableQR : {}", id);
        tableQRRepository.delete(id);
        tableQRSearchRepository.delete(id);
    }

    /**
     * Search for the tableQR corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TableQRDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TableQRS for query {}", query);
        Page<TableQR> result = tableQRSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(tableQR -> tableQRMapper.tableQRToTableQRDTO(tableQR));
    }
}
