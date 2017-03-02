package com.fa.repository.search;

import com.fa.domain.CommerceItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CommerceItem entity.
 */
public interface CommerceItemSearchRepository extends ElasticsearchRepository<CommerceItem, Long> {
}
