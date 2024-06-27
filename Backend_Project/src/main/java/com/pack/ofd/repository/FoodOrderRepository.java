package com.pack.ofd.repository;

import com.pack.ofd.model.FoodOrder;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Integer> {

	List<FoodOrder> findByCustomerId(int userId);
	
	void deleteByCustomerId(Long customerId);
}
