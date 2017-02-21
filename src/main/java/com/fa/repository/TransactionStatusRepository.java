package com.fa.repository;

import com.fa.domain.TransactionStatus;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TransactionStatus entity.
 */
@SuppressWarnings("unused")
public interface TransactionStatusRepository extends JpaRepository<TransactionStatus,Long> {

}
