package com.pack.ofd.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pack.ofd.exception.UserNotFoundException;
import com.pack.ofd.model.User;
import com.pack.ofd.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:1234")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@RequestMapping("/")
	public String home() {
		return "Hello WELCOME!";
	}

	@PostMapping("/register")
	User newUser(@RequestBody User newUser) {
		return userRepository.save(newUser);
	}

	@GetMapping("/users")
	List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/user/{id}")
	User getUserById(@PathVariable int id) {
		return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
	}

	@PostMapping("/user/login")
	public ResponseEntity<Object> loginUser(@RequestBody User user) {
		User foundUser= this.userRepository.findByEmailId(user.getEmailId());
		if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
			return ResponseEntity.ok(foundUser);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		}
	}
}
