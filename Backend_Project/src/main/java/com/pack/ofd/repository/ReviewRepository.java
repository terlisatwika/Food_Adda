package com.pack.ofd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pack.ofd.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{

	List<Review> findByFoodId(int foodId);

}
