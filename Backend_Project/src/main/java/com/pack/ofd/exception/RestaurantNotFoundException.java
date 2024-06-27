package com.pack.ofd.exception;

public class RestaurantNotFoundException extends RuntimeException{

	public RestaurantNotFoundException(int id) {
		
		super("Could not found Restaurant with id : "+id);
	}
}
