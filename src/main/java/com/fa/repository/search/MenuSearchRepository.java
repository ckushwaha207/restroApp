package com.fa.repository.search;

import com.fa.domain.Menu;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Menu entity.
 */
public interface MenuSearchRepository extends ElasticsearchRepository<Menu, Long> {
}
