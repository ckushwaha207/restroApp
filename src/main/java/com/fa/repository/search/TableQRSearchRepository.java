package com.fa.repository.search;

import com.fa.domain.TableQR;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TableQR entity.
 */
public interface TableQRSearchRepository extends ElasticsearchRepository<TableQR, Long> {
}
