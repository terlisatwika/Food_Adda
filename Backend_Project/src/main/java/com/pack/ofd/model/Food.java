package com.pack.ofd.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Food {

	@Id
	@GeneratedValue
	private int foodId;
	private String foodImgUrl;
	private String foodImgUrl2;
	private String foodImgUrl3;
	private String name;
	private double price;
	private String description;
	private String categoryName;
	private int restaurantId;
	
	public int getFoodId() {
		return foodId;
	}
	public void setFoodId(int foodId) {
		this.foodId = foodId;
	}
	public String getFoodImgUrl() {
		return foodImgUrl;
	}
	public void setFoodImgUrl(String foodImgUrl) {
		this.foodImgUrl = foodImgUrl;
	}
	public String getFoodImgUrl2() {
		return foodImgUrl2;
	}
	public void setFoodImgUrl2(String foodImgUrl2) {
		this.foodImgUrl2 = foodImgUrl2;
	}
	public String getFoodImgUrl3() {
		return foodImgUrl3;
	}
	public void setFoodImgUrl3(String foodImgUrl3) {
		this.foodImgUrl3 = foodImgUrl3;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public int getRestaurantId() {
		return restaurantId;
	}
	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}
	
}
