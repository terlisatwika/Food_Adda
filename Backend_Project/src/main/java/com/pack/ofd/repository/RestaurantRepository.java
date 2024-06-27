package com.pack.ofd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pack.ofd.model.Restaurant;
import com.pack.ofd.model.User;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{

	public Restaurant findByEmailId(String emailId);
}
