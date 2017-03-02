package com.fa.repository.search;

import com.fa.domain.TransactionStatus;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TransactionStatus entity.
 */
public interface TransactionStatusSearchRepository extends ElasticsearchRepository<TransactionStatus, Long> {
}
