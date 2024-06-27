package com.pack.ofd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pack.ofd.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

	List<Cart> findByCustomerId(Long customerId);
	
	void deleteByCustomerId(int userId);

	Optional<Cart> findByFoodIdAndCustomerId(int foodId, int customerId);
    
}

