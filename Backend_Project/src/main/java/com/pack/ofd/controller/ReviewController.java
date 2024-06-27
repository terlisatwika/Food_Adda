package com.pack.ofd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pack.ofd.model.Food;
import com.pack.ofd.model.Review;
import com.pack.ofd.repository.ReviewRepository;

@RestController
@CrossOrigin(origins = "http://localhost:1234")
public class ReviewController {

	@Autowired
	private ReviewRepository reviewRepository;
	
	@PostMapping("/addreview")
	Review newReview(@RequestBody Review newReview) {
		return reviewRepository.save(newReview);
	}
	
	@GetMapping("/getreviewbyfoodid/{foodId}")
	List<Review> getReviewByFoodId(@PathVariable("foodId") int foodId) {
        return reviewRepository.findByFoodId(foodId);
    }
	
}
