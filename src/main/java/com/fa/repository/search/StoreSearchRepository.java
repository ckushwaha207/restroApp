package com.fa.repository.search;

import com.fa.domain.Store;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Store entity.
 */
public interface StoreSearchRepository extends ElasticsearchRepository<Store, Long> {
}
