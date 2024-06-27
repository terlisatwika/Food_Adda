package com.pack.ofd.exception;

public class DeliveryPersonNotFoundException extends RuntimeException {

	public DeliveryPersonNotFoundException(int id) {
		
		super("Could not found Delivery Person with id : "+id);
	}
}
