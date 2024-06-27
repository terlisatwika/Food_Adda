package com.pack.ofd.controller;

import com.pack.ofd.exception.FoodNotFoundException;
import com.pack.ofd.model.Cart;
import com.pack.ofd.model.User;
import com.pack.ofd.repository.CartRepository;
import com.pack.ofd.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:1234") // Allow requests from frontend origin
public class CartController {

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Get all cart items
    @GetMapping("/viewallcartitems")
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }
    
    @GetMapping("/viewcartitems/{customerId}")
    public ResponseEntity<List<Cart>> getCartItemsByCustomerId(@PathVariable("customerId") Long customerId) {
        try {
            List<Cart> cartItems = cartRepository.findByCustomerId(customerId);
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null); // Return an empty list or handle error gracefully
        }
    }
    
    // Add a cart item\
    @PostMapping("/additemtocart/{foodId}")
    public ResponseEntity<?> addCartItem(@PathVariable("foodId") int foodId, @RequestBody Cart cart) {
        try {
            // Validate if the customer exists before adding to cart
            Optional<User> customer = userRepository.findById(cart.getCustomerId());
            if (!customer.isPresent()) {
                return ResponseEntity.badRequest().body("Customer with ID " + cart.getCustomerId() + " not found.");
            }

            // Check if the item already exists in the cart
            Optional<Cart> existingCartItem = cartRepository.findByFoodIdAndCustomerId(foodId, cart.getCustomerId());

            if (existingCartItem.isPresent()) {
                // Item already exists, update the quantity
                Cart currentCart = existingCartItem.get();
                currentCart.setQuantity(currentCart.getQuantity() + cart.getQuantity()); // Adjust quantity as needed
                Cart updatedCart = cartRepository.save(currentCart);
                return ResponseEntity.ok(updatedCart);
            } else {
                // Item does not exist, add a new cart item
                cart.setFoodId(foodId);
                Cart addedCart = cartRepository.save(cart);
                return new ResponseEntity<>(addedCart, HttpStatus.CREATED);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error adding item to cart: " + e.getMessage());
        }
    }



    @PutMapping("/updatecartitem/{id}")
    public ResponseEntity<Cart> updateCartItem(@RequestBody Cart newCart, @PathVariable("id") Long id) {
        try {
            Cart existingCart = cartRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + id));

            existingCart.setCustomerId(newCart.getCustomerId());
            existingCart.setFoodId(newCart.getFoodId());
            existingCart.setQuantity(newCart.getQuantity());

            Cart updatedCart = cartRepository.save(existingCart);
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }


    // Delete a cart item by ID
    @DeleteMapping("/cart/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable("id") Long id) {
        cartRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
