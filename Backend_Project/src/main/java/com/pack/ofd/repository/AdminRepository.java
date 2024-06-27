package com.pack.ofd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pack.ofd.model.Admin;
import com.pack.ofd.model.User;

public interface AdminRepository extends JpaRepository<Admin, Integer>{
	
	 public Admin findByEmailId(String emailId);
}
