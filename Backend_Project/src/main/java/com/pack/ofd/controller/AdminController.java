package com.pack.ofd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pack.ofd.model.Admin;
import com.pack.ofd.model.Restaurant;
import com.pack.ofd.model.User;
import com.pack.ofd.repository.AdminRepository;

@RestController
@CrossOrigin(origins = "http://localhost:1234")
public class AdminController {

	@Autowired
	private AdminRepository adminRepository;
	
	@PostMapping("/adminregister")
	Admin newAdmin(@RequestBody Admin newAdmin) {
		return adminRepository.save(newAdmin);
	}
	
	@GetMapping("/admindetails")
	List<Admin> getAllAdminDetails(){
		return adminRepository.findAll();
	}
	
	@PostMapping("/admin/login")
	public ResponseEntity<Object> loginAdmin(@RequestBody Admin admin) {
		
	    if (admin.getEmailId().equals("foodadda43@gmail.com") && admin.getPassword().equals("fdad123")) {
	        Admin defaultAdmin = new Admin();
	        defaultAdmin.setEmailId("default@admin.com");
	        return ResponseEntity.ok(defaultAdmin);
	    }

		Admin foundAdmin= this.adminRepository.findByEmailId(admin.getEmailId());
		if (foundAdmin != null && foundAdmin.getPassword().equals(admin.getPassword())) {
			return ResponseEntity.ok(foundAdmin);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		}
	}
}
