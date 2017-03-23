package com.fa.service.impl;

import com.fa.domain.CommerceItem;
import com.fa.domain.enumeration.ItemState;
import com.fa.domain.enumeration.OrderState;
import com.fa.repository.CommerceItemRepository;
import com.fa.repository.UserRepository;
import com.fa.service.CommerceItemService;
import com.fa.service.OrderService;
import com.fa.domain.Order;
import com.fa.repository.OrderRepository;
import com.fa.repository.search.OrderSearchRepository;
import com.fa.service.dto.CartDTO;
import com.fa.service.dto.CartItemDTO;
import com.fa.service.dto.CommerceItemDTO;
import com.fa.service.dto.OrderDTO;
import com.fa.service.mapper.CommerceItemMapper;
import com.fa.service.mapper.OrderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Order.
 */
@Service
@Transactional
public class OrderServiceImpl implements OrderService{

    private final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;

    private final OrderMapper orderMapper;

    private final CommerceItemMapper commerceItemMapper;

    private final OrderSearchRepository orderSearchRepository;

    private final UserRepository userRepository;

    private final CommerceItemService commerceItemService;

    public OrderServiceImpl(OrderRepository orderRepository, OrderMapper orderMapper, CommerceItemMapper commerceItemMapper, OrderSearchRepository orderSearchRepository, CommerceItemService commerceItemService, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.commerceItemMapper = commerceItemMapper;
        this.orderSearchRepository = orderSearchRepository;
        this.commerceItemService = commerceItemService;
        this.userRepository = userRepository;
    }

    /**
     * Save a order.
     *
     * @param orderDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderDTO save(OrderDTO orderDTO) {
        log.debug("Request to save Order : {}", orderDTO);
        Order order = orderMapper.orderDTOToOrder(orderDTO);
        order = orderRepository.save(order);
        OrderDTO result = orderMapper.orderToOrderDTO(order);
        orderSearchRepository.save(order);
        return result;
    }

    /**
     *  Get all the orders.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        Page<Order> result = orderRepository.findAll(pageable);
        return result.map(order -> orderMapper.orderToOrderDTO(order));
    }

    /**
     *  Get one order by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrderDTO findOne(Long id) {
        log.debug("Request to get Order : {}", id);
        Order order = orderRepository.findOne(id);
        OrderDTO orderDTO = orderMapper.orderToOrderDTO(order);
        return orderDTO;
    }

    /**
     *  Delete the  order by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Order : {}", id);
        orderRepository.delete(id);
        orderSearchRepository.delete(id);
    }

    /**
     * Search for the order corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrderDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Orders for query {}", query);
        Page<Order> result = orderSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(order -> orderMapper.orderToOrderDTO(order));
    }

    /**
     * Create Order using Cart.
     *
     * @param cartDTO the cartDTO used to create orderDTO
     * @return the persisted entity
     */
    @Override
    public OrderDTO createOrder(CartDTO cartDTO) {
        log.debug("Request to create Order using cartDTO: " + cartDTO);

        Order order = new Order();
        order.setProfile(userRepository.getOne(cartDTO.getProfileId()));
        order.setState(OrderState.PROCESSING);
        order = orderRepository.save(order);

        Double total = 0.0d;
        Set<CommerceItem> commerceItems = new HashSet<>();
        for(CartItemDTO cartItem : cartDTO.getItems()) {
            CommerceItemDTO item = new CommerceItemDTO();
            item.setOrderId(order.getId());
            item.setProductId(cartItem.getProductId());
            item.setQuantity(cartItem.getQuantity());
            item = commerceItemService.save(item);
            total += item.getTotalPrice();
            commerceItems.add(commerceItemMapper.commerceItemDTOToCommerceItem(item));
        }

        order.setItems(commerceItems);
        order.setSubTotal(total);
        order.setTotal(total);
        // TODO: Have to change logic for setting Order Number
        order.setOrderNumber("ORD00000" + order.getId());
        order = orderRepository.save(order);

        OrderDTO result = orderMapper.orderToOrderDTO(order);
        orderSearchRepository.save(order);
        return result;
    }
}
