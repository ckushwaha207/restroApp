package com.fa.repository.search;

import com.fa.domain.MenuItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MenuItem entity.
 */
public interface MenuItemSearchRepository extends ElasticsearchRepository<MenuItem, Long> {
}
