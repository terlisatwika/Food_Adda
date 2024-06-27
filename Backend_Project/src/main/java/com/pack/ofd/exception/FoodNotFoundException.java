package com.pack.ofd.exception;

public class FoodNotFoundException extends RuntimeException {

	public FoodNotFoundException(int id) {
		
		super("Could not found Food with id : "+id);
	}
}
