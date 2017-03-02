package com.fa.repository;

import com.fa.domain.MenuItem;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the MenuItem entity.
 */
@SuppressWarnings("unused")
public interface MenuItemRepository extends JpaRepository<MenuItem,Long> {

}
