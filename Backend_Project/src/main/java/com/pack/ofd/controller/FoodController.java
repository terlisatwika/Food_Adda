	package com.pack.ofd.controller;
	
	import java.util.List;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.bind.annotation.CrossOrigin;
	import org.springframework.web.bind.annotation.DeleteMapping;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.PathVariable;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.PutMapping;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RestController;
	
	import com.pack.ofd.exception.CategoryNotFoundException;
	import com.pack.ofd.exception.FoodNotFoundException;
	import com.pack.ofd.exception.RestaurantNotFoundException;
	import com.pack.ofd.exception.UserNotFoundException;
	import com.pack.ofd.model.Category;
	import com.pack.ofd.model.Food;
	import com.pack.ofd.model.User;
	import com.pack.ofd.repository.FoodRepository;
	import com.pack.ofd.repository.RestaurantRepository;
	
	@RestController
	@CrossOrigin(origins = "http://localhost:1234")
	public class FoodController {
	
		@Autowired
		private RestaurantRepository restaurantRepository;
	
		@Autowired
		private FoodRepository foodRepository;
	
		@PostMapping("/addfood")
		Food newFood(@RequestBody Food newFood) {
			 validateRestaurantId(newFood.getRestaurantId());
			return foodRepository.save(newFood);
		}
	
		@GetMapping("/viewallfoods")
		List<Food> getAllFoods() {
			return foodRepository.findAll();
		}
	
		@GetMapping("/viewfoodbyid/{id}")
		Food getFoodById(@PathVariable("id") int id) {
			return foodRepository.findById(id).orElseThrow(() -> new FoodNotFoundException(id));
		}
	
		@GetMapping("/viewfoodbyres/{id}")
	    List<Food> getFoodByResId(@PathVariable("id") int id) {
	        return foodRepository.findByRestaurantId(id);
	    }
	
		@PutMapping("/updatefood/{id}")
		Food updateFood(@RequestBody Food newFood, @PathVariable("id") int id) {
			return foodRepository.findById(id).map(food -> {
				food.setName(newFood.getName());
				food.setDescription(newFood.getDescription());
				food.setPrice(newFood.getPrice());
				food.setCategoryName(newFood.getCategoryName());
				food.setFoodImgUrl(newFood.getFoodImgUrl());
				food.setFoodImgUrl2(newFood.getFoodImgUrl2());
				food.setFoodImgUrl3(newFood.getFoodImgUrl3());
				return foodRepository.save(food);
			}).orElseThrow(() -> new FoodNotFoundException(id));
		}
	
		@DeleteMapping("/delfood/{id}")
		String deleteFood(@PathVariable("id") int id) {
			if (!foodRepository.existsById(id)) {
				throw new FoodNotFoundException(id);
			}
			foodRepository.deleteById(id);
			return "Food with id :  " + id + " has been deleted successfully.";
		}
	
		private void validateRestaurantId(int restaurantId) {
			restaurantRepository.findById(restaurantId).orElseThrow(() -> new RestaurantNotFoundException(restaurantId));
		}
	}
