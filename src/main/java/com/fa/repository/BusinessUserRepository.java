package com.fa.repository;

import com.fa.domain.BusinessUser;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the BusinessUser entity.
 */
@SuppressWarnings("unused")
public interface BusinessUserRepository extends JpaRepository<BusinessUser,Long> {

}
