package com.pack.ofd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pack.ofd.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer>{

	List<Payment> findByOrderId(int orderId);

}
