package com.pack.ofd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pack.ofd.model.User;

public interface UserRepository extends JpaRepository<User,Integer> {

	 public User findByEmailId(String emailId);
}
