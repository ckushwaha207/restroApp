package com.fa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fa.service.CommerceItemService;
import com.fa.web.rest.util.HeaderUtil;
import com.fa.web.rest.util.PaginationUtil;
import com.fa.service.dto.CommerceItemDTO;
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

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing CommerceItem.
 */
@RestController
@RequestMapping("/api")
public class CommerceItemResource {

    private final Logger log = LoggerFactory.getLogger(CommerceItemResource.class);

    private static final String ENTITY_NAME = "commerceItem";
        
    private final CommerceItemService commerceItemService;

    public CommerceItemResource(CommerceItemService commerceItemService) {
        this.commerceItemService = commerceItemService;
    }

    /**
     * POST  /commerce-items : Create a new commerceItem.
     *
     * @param commerceItemDTO the commerceItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new commerceItemDTO, or with status 400 (Bad Request) if the commerceItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/commerce-items")
    @Timed
    public ResponseEntity<CommerceItemDTO> createCommerceItem(@RequestBody CommerceItemDTO commerceItemDTO) throws URISyntaxException {
        log.debug("REST request to save CommerceItem : {}", commerceItemDTO);
        if (commerceItemDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new commerceItem cannot already have an ID")).body(null);
        }
        CommerceItemDTO result = commerceItemService.save(commerceItemDTO);
        return ResponseEntity.created(new URI("/api/commerce-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /commerce-items : Updates an existing commerceItem.
     *
     * @param commerceItemDTO the commerceItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated commerceItemDTO,
     * or with status 400 (Bad Request) if the commerceItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the commerceItemDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/commerce-items")
    @Timed
    public ResponseEntity<CommerceItemDTO> updateCommerceItem(@RequestBody CommerceItemDTO commerceItemDTO) throws URISyntaxException {
        log.debug("REST request to update CommerceItem : {}", commerceItemDTO);
        if (commerceItemDTO.getId() == null) {
            return createCommerceItem(commerceItemDTO);
        }
        CommerceItemDTO result = commerceItemService.save(commerceItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, commerceItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /commerce-items : get all the commerceItems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of commerceItems in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/commerce-items")
    @Timed
    public ResponseEntity<List<CommerceItemDTO>> getAllCommerceItems(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of CommerceItems");
        Page<CommerceItemDTO> page = commerceItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/commerce-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /commerce-items/:id : get the "id" commerceItem.
     *
     * @param id the id of the commerceItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the commerceItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/commerce-items/{id}")
    @Timed
    public ResponseEntity<CommerceItemDTO> getCommerceItem(@PathVariable Long id) {
        log.debug("REST request to get CommerceItem : {}", id);
        CommerceItemDTO commerceItemDTO = commerceItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(commerceItemDTO));
    }

    /**
     * DELETE  /commerce-items/:id : delete the "id" commerceItem.
     *
     * @param id the id of the commerceItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/commerce-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteCommerceItem(@PathVariable Long id) {
        log.debug("REST request to delete CommerceItem : {}", id);
        commerceItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/commerce-items?query=:query : search for the commerceItem corresponding
     * to the query.
     *
     * @param query the query of the commerceItem search 
     * @param pageable the pagination information
     * @return the result of the search
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/_search/commerce-items")
    @Timed
    public ResponseEntity<List<CommerceItemDTO>> searchCommerceItems(@RequestParam String query, @ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to search for a page of CommerceItems for query {}", query);
        Page<CommerceItemDTO> page = commerceItemService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/commerce-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
