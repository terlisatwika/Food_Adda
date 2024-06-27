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

import com.pack.ofd.exception.CategoryNotFoundAdvice;
import com.pack.ofd.exception.CategoryNotFoundException;
import com.pack.ofd.exception.UserNotFoundException;
import com.pack.ofd.model.Category;
import com.pack.ofd.repository.CategoryRepository;

@RestController
@CrossOrigin(origins = "http://localhost:1234")
public class CategoryController {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@PostMapping("/addcategory")
	Category newCategory(@RequestBody Category newCategory) {
		return categoryRepository.save(newCategory);
	}
	
	@GetMapping("/viewcategories")
	List<Category> getAllDeliveryPersons(){
		return categoryRepository.findAll();
	}
	
	@GetMapping("/categorybyid/{id}")
	Category getCategoryById(@PathVariable("id") int id) {
		return categoryRepository.findById(id)
				.orElseThrow(()-> new CategoryNotFoundException(id));
	}
	
	@PutMapping("/category/{id}")
	Category updateCategory(@RequestBody Category newCategory,@PathVariable("id") int id) {
		return categoryRepository.findById(id)
				.map(category -> {
					category.setCategoryImg(newCategory.getCategoryImg());
					category.setName(newCategory.getName());
					category.setDescription(newCategory.getDescription());
					return categoryRepository.save(category);
				}).orElseThrow(()-> new CategoryNotFoundException(id));
	}
	
	@DeleteMapping("/categoryd/{id}")
	String deleteCategory(@PathVariable("id") int id) {
		if(!categoryRepository.existsById(id)) {
			throw new CategoryNotFoundException(id);
		}
		categoryRepository.deleteById(id);
		return "Category with id :  " +id +" has been deleted successfully.";
	}
}
