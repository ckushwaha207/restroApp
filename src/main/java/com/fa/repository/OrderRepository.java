package com.fa.repository;

import com.fa.domain.Order;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Order entity.
 */
@SuppressWarnings("unused")
public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query("select order from Order order where order.profile.login = ?#{principal.username}")
    List<Order> findByProfileIsCurrentUser();

}
