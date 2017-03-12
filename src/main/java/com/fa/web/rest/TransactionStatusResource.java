package com.fa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fa.service.TransactionStatusService;
import com.fa.web.rest.util.HeaderUtil;
import com.fa.web.rest.util.PaginationUtil;
import com.fa.service.dto.TransactionStatusDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TransactionStatus.
 */
@RestController
@RequestMapping("/api")
public class TransactionStatusResource {

    private final Logger log = LoggerFactory.getLogger(TransactionStatusResource.class);

    private static final String ENTITY_NAME = "transactionStatus";
        
    private final TransactionStatusService transactionStatusService;

    public TransactionStatusResource(TransactionStatusService transactionStatusService) {
        this.transactionStatusService = transactionStatusService;
    }

    /**
     * POST  /transaction-statuses : Create a new transactionStatus.
     *
     * @param transactionStatusDTO the transactionStatusDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transactionStatusDTO, or with status 400 (Bad Request) if the transactionStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transaction-statuses")
    @Timed
    public ResponseEntity<TransactionStatusDTO> createTransactionStatus(@Valid @RequestBody TransactionStatusDTO transactionStatusDTO) throws URISyntaxException {
        log.debug("REST request to save TransactionStatus : {}", transactionStatusDTO);
        if (transactionStatusDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new transactionStatus cannot already have an ID")).body(null);
        }
        TransactionStatusDTO result = transactionStatusService.save(transactionStatusDTO);
        return ResponseEntity.created(new URI("/api/transaction-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transaction-statuses : Updates an existing transactionStatus.
     *
     * @param transactionStatusDTO the transactionStatusDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transactionStatusDTO,
     * or with status 400 (Bad Request) if the transactionStatusDTO is not valid,
     * or with status 500 (Internal Server Error) if the transactionStatusDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transaction-statuses")
    @Timed
    public ResponseEntity<TransactionStatusDTO> updateTransactionStatus(@Valid @RequestBody TransactionStatusDTO transactionStatusDTO) throws URISyntaxException {
        log.debug("REST request to update TransactionStatus : {}", transactionStatusDTO);
        if (transactionStatusDTO.getId() == null) {
            return createTransactionStatus(transactionStatusDTO);
        }
        TransactionStatusDTO result = transactionStatusService.save(transactionStatusDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transactionStatusDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transaction-statuses : get all the transactionStatuses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transactionStatuses in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/transaction-statuses")
    @Timed
    public ResponseEntity<List<TransactionStatusDTO>> getAllTransactionStatuses(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of TransactionStatuses");
        Page<TransactionStatusDTO> page = transactionStatusService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transaction-statuses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /transaction-statuses/:id : get the "id" transactionStatus.
     *
     * @param id the id of the transactionStatusDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transactionStatusDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transaction-statuses/{id}")
    @Timed
    public ResponseEntity<TransactionStatusDTO> getTransactionStatus(@PathVariable Long id) {
        log.debug("REST request to get TransactionStatus : {}", id);
        TransactionStatusDTO transactionStatusDTO = transactionStatusService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(transactionStatusDTO));
    }

    /**
     * DELETE  /transaction-statuses/:id : delete the "id" transactionStatus.
     *
     * @param id the id of the transactionStatusDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transaction-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransactionStatus(@PathVariable Long id) {
        log.debug("REST request to delete TransactionStatus : {}", id);
        transactionStatusService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/transaction-statuses?query=:query : search for the transactionStatus corresponding
     * to the query.
     *
     * @param query the query of the transactionStatus search 
     * @param pageable the pagination information
     * @return the result of the search
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/_search/transaction-statuses")
    @Timed
    public ResponseEntity<List<TransactionStatusDTO>> searchTransactionStatuses(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of TransactionStatuses for query {}", query);
        Page<TransactionStatusDTO> page = transactionStatusService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/transaction-statuses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
