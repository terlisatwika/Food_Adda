package com.pack.ofd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pack.ofd.model.DeliveryPerson;
import com.pack.ofd.model.Food;

public interface DeliveryPersonRepository extends JpaRepository<DeliveryPerson, Integer>{

	public DeliveryPerson findByEmailId(String emailId);
	
	@Query("SELECT d FROM DeliveryPerson d WHERE d.restaurantId = :restaurantId")
	List<DeliveryPerson> findByRestaurantId(@Param("restaurantId")int restaurantId);

}
