package com.fa.repository;

import com.fa.domain.TableQR;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TableQR entity.
 */
@SuppressWarnings("unused")
public interface TableQRRepository extends JpaRepository<TableQR,Long> {

    TableQR findOneByCode(String code);
}
