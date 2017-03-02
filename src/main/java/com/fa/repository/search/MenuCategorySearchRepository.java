package com.fa.repository.search;

import com.fa.domain.MenuCategory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MenuCategory entity.
 */
public interface MenuCategorySearchRepository extends ElasticsearchRepository<MenuCategory, Long> {
}
