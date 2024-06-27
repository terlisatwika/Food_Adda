package com.pack.ofd.repository;

import com.pack.ofd.model.OrderItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
 
	List<OrderItem> findByOrderId(int orderId);

	List<OrderItem> findByRestaurantId(int id);
}
