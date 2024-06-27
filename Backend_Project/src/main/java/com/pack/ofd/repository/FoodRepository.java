package com.pack.ofd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pack.ofd.model.Food;

public interface FoodRepository extends JpaRepository<Food, Integer>{
	
	@Query("SELECT f FROM Food f WHERE f.restaurantId = :restaurantId")
	List<Food> findByRestaurantId(@Param("restaurantId")int restaurantId);

}
