package com.pack.ofd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pack.ofd.exception.FoodNotFoundException;
import com.pack.ofd.exception.RestaurantNotFoundException;
import com.pack.ofd.model.DeliveryPerson;
import com.pack.ofd.model.Food;
import com.pack.ofd.model.User;
import com.pack.ofd.repository.DeliveryPersonRepository;
import com.pack.ofd.repository.RestaurantRepository;

@RestController
@CrossOrigin(origins = "http://localhost:1234")
public class DeliveryPersonController {


	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@Autowired
	private DeliveryPersonRepository deliveryPersonRepository;
	
	@PostMapping("/adddeliveryperson")
	DeliveryPerson newDeliveryPerson(@RequestBody DeliveryPerson newDeliveryPerson) {
		 validateRestaurantId(newDeliveryPerson.getRestaurantId());
		return deliveryPersonRepository.save(newDeliveryPerson);
	}

	@GetMapping("/alldeliverypersons")
	List<DeliveryPerson> getAllDeliveryPerson(){
		return deliveryPersonRepository.findAll();
	}
		
	@GetMapping("/viewdeliverypersonbyres/{id}")
    List<DeliveryPerson> getDeliveryPersonsByResId(@PathVariable("id") int id) {
        return deliveryPersonRepository.findByRestaurantId(id);
    }
	
	@DeleteMapping("/deldeliveryperson/{id}")
	String deleteDeliveryPerson(@PathVariable("id") int id) {
		if(!deliveryPersonRepository.existsById(id)) {
			throw new FoodNotFoundException(id);
		}
		deliveryPersonRepository.deleteById(id);
		return "Delivery person with id :  " +id +" has been deleted successfully.";
	}

	@PostMapping("/delivery/login")
	public ResponseEntity<Object> loginDeliveryPerson(@RequestBody DeliveryPerson deliveryPerson) {
		DeliveryPerson foundDeliveryPerson= this.deliveryPersonRepository.findByEmailId(deliveryPerson.getEmailId());
		if (foundDeliveryPerson != null && foundDeliveryPerson.getPassword().equals(deliveryPerson.getPassword())) {
			return ResponseEntity.ok(foundDeliveryPerson);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		}
	}
	

	private void validateRestaurantId(int restaurantId) {
		restaurantRepository.findById(restaurantId).orElseThrow(() -> new RestaurantNotFoundException(restaurantId));
	}
}
