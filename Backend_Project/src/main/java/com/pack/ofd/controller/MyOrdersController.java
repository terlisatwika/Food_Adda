package com.pack.ofd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pack.ofd.model.Cart;
import com.pack.ofd.model.Food;
import com.pack.ofd.model.FoodOrder;
import com.pack.ofd.model.OrderItem;
import com.pack.ofd.repository.CartRepository;
import com.pack.ofd.repository.FoodOrderRepository;
import com.pack.ofd.repository.OrderItemRepository;
import com.pack.ofd.repository.FoodRepository;
import com.pack.ofd.repository.RestaurantRepository;

import jakarta.transaction.Transactional;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:1234")
public class MyOrdersController {

    @Autowired
    private FoodOrderRepository foodOrderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @PostMapping("/placeOrder/{userId}")
    @Transactional
    public ResponseEntity<String> placeOrder(@PathVariable("userId") int userId) {
        try {
            List<Cart> cartItems = cartRepository.findByCustomerId((long) userId);

            // Create FoodOrder entity
            FoodOrder foodOrder = new FoodOrder();
            foodOrder.setCustomerId(userId);
            foodOrder.setOrderDate(new Date(System.currentTimeMillis()));
            foodOrder.setStatus("Pending");

            foodOrderRepository.save(foodOrder);

            // Create OrderItem entities
            List<OrderItem> orderItems = new ArrayList<>();
            for (Cart cartItem : cartItems) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrderId(foodOrder.getOrderId());
                orderItem.setFoodId(cartItem.getFoodId());
                orderItem.setQuantity(cartItem.getQuantity());

                Optional<Food> foodOptional = foodRepository.findById(cartItem.getFoodId());
                if (foodOptional.isPresent()) {
                    Food food = foodOptional.get();
                    orderItem.setRestaurantId(food.getRestaurantId());
                    orderItem.setFoodImgUrl(food.getFoodImgUrl());
                } else {
                    throw new RuntimeException("Food not found for foodId: " + cartItem.getFoodId());
                }

                orderItems.add(orderItem);
            }

            orderItemRepository.saveAll(orderItems);

            // Delete cart items after successful order placement
            cartRepository.deleteByCustomerId(userId);

            return ResponseEntity.ok("Order placed successfully");
        } catch (Exception e) {
            // Handle exceptions or rollback transaction
            return ResponseEntity.status(500).body("Failed to place order: " + e.getMessage());
        }
    }

    
    @GetMapping("/orders/{orderId}")
    public ResponseEntity<?> getOrderDetails(@PathVariable("orderId") int orderId) {
        // Step 1: Fetch FoodOrder details by orderId
        Optional<FoodOrder> foodOrderOptional = foodOrderRepository.findById(orderId);
        if (!foodOrderOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        FoodOrder foodOrder = foodOrderOptional.get();

        // Step 2: Fetch all OrderItems associated with this orderId
        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);

        // Step 3: Construct the response inline
        Map<String, Object> response = new HashMap<>();
        response.put("foodOrder", foodOrder);
        response.put("orderItems", orderItems);

        return ResponseEntity.ok().body(response);
    }
    
    @GetMapping("/orderbyuserid/{userId}")
    public ResponseEntity<List<FoodOrder>> getOrdersByUserId(@PathVariable("userId") int userId) {
        List<FoodOrder> orders = foodOrderRepository.findByCustomerId(userId);
        
        // Fetch order items for each order
        for (FoodOrder order : orders) {
            List<OrderItem> orderItems = orderItemRepository.findByOrderId(order.getOrderId());
            order.setOrderItems(orderItems);
        }
        
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/vieworderbyrestaurantid/{id}")
    List<OrderItem> getOrdersByRestaurantId(@PathVariable("id") int id) {
        return orderItemRepository.findByRestaurantId(id);
    }
    
    @GetMapping("/viewallorders")
	List<FoodOrder> getAllFoods() {
		return foodOrderRepository.findAll();
	}
}
