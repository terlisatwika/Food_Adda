package com.pack.ofd.exception;

public class CategoryNotFoundException extends RuntimeException{

	public CategoryNotFoundException(int id) {
		
		super("Could not found category with id : "+id);
	}
}
