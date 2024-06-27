import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RestaurantCardShimmer } from "../ShimmerEffect/ShimmerEffect";
import { useUser } from "./UserContext";

const RestaurantCards = ({ food }) => {
  const { userData } = useUser();

  const [listOfRestaurantCards, setListOfRestaurantCards] = useState([]);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadRestaurantData();
    fetchCartItems();
  }, []);

  const loadRestaurantData = async () => {
    try {
      const foodsResult = await fetch("http://localhost:8080/viewallfoods");
      if (!foodsResult.ok) {
        throw new Error("Failed to fetch restaurant cards");
      }
      const foodsJson = await foodsResult.json();
      setListOfRestaurantCards(foodsJson);
    } catch (error) {
      console.error("Error loading foods:", error);
    }

    try {
      const restaurantsResult = await fetch(
        "http://localhost:8080/allrestaurants"
      );
      if (!restaurantsResult.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const restaurantsJson = await restaurantsResult.json();
      setListOfRestaurants(restaurantsJson);
    } catch (error) {
      console.error("Error loading restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:8080/viewallcartitems", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleAddToCart = async (foodId) => {
    console.log(userData.userId);
    try {
      // Ensure userId is available and valid
      if (!userData.userId || userData.userId <= 0) {
        throw new Error("User ID not available or invalid");
      }

      const response = await fetch(
        `http://localhost:8080/additemtocart/${foodId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: userId,
            foodId: foodId,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add item to cart: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Item added to cart:", responseData);
      alert("Item added to cart:", responseData);
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
    }
  };

  const getRestaurantNameById = (restaurantId) => {
    const restaurant = listOfRestaurants.find(
      (r) => r.restaurantId === restaurantId
    );
    return restaurant ? restaurant.restaurantName : "Unknown Restaurant";
  };

  return loading ? (
    <p>
      <RestaurantCardShimmer />
    </p>
  ) : (
    <div className="cards my-5 mx-2 restaurantcards">
      {/* {listOfRestaurantCards.map((restaurantCard) => ( */}
        <div
          className="card shadow mx-2 restcard"
          style={{ width: "21rem " }}
          key={food.foodId}
        >
          <Link
            to={`/customer/food-details/${food.foodId}`}
            className="card-link"
          >
            <img
              src={food.foodImgUrl}
              className="card-img-top rest-img"
              alt="..."
              height={250}
            />
          </Link>

          <div className="card-body ">
            <h5 className="card-title">{food.name}</h5>
            <p className="card-text">
              {getRestaurantNameById(food.restaurantId)}
            </p>
            <p className="card-text">{food.categoryName}</p>
            <p className="card-text">
              Rating :{" "}
              <span className="bg-success text-light px-2 border rounded">
                4.0 ☆
              </span>
            </p>
            <p className="card-text">Delivery Time : 25-35 Min</p>
            <p className="card-text text-danger fs-4">
              Price : {food.price}
            </p>
            <Link
              to={`/customer/food-details/${food.foodId}`}
              className="btn btn-primary m-2"
            >
              View Details
            </Link>
            <button
              className="btn btn-primary m-2"
              onClick={() => handleAddToCart(food.foodId)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      {/* ))} */}
    </div>
  );
};

export default RestaurantCards;
