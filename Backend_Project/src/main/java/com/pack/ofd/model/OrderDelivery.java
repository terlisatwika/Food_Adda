package com.pack.ofd.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class OrderDelivery {

	@Id
	@GeneratedValue
	private int orderDeliveryId;
	private int orderId;
	private int deliveryPersonId;
	private String status;
	private LocalDateTime deliveryDate;
	
	public int getOrderDeliveryId() {
		return orderDeliveryId;
	}
	public void setOrderDeliveryId(int orderDeliveryId) {
		this.orderDeliveryId = orderDeliveryId;
	}
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public int getDeliveryPersonId() {
		return deliveryPersonId;
	}
	public void setDeliveryPersonId(int deliveryPersonId) {
		this.deliveryPersonId = deliveryPersonId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDateTime getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(LocalDateTime deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	
}
