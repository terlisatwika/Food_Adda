package com.pack.ofd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pack.ofd.model.Payment;
import com.pack.ofd.repository.PaymentRepository;

@RestController
@CrossOrigin(origins = "http://localhost:1234")
public class PaymentController {

	@Autowired
	private PaymentRepository paymentRepository;
	
	@PostMapping("/payment")
	Payment newPayment(@RequestBody Payment newPayment) {
		return paymentRepository.save(newPayment);
	}
	
	@GetMapping("getpaymentdetailsbyorder/{orderId}")
	List<Payment> getPaymentDetailsByOrderId(@PathVariable ("orderId")int orderId){
		return paymentRepository.findByOrderId(orderId);
	}
}
