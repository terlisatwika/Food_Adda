import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "./UserContext";

const ViewFoodInfo = () => {
  const { foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useUser();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      setLoading(true); 
      try {
        const response = await fetch(
          `http://localhost:8080/viewfoodbyid/${foodId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch food details");
        }
        const data = await response.json();
        setFoodDetails(data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching food details:", error);
        setError("Failed to fetch food details. Please try again later.");
        setLoading(false); 
      }
    };

    if (foodId) {
      fetchFoodDetails();
    }
  }, [foodId]);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (foodDetails && foodDetails.restaurantId) {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:8080/restaurant/${foodDetails.restaurantId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch restaurant details");
          }
          const data = await response.json();
          setRestaurantDetails(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
          setError(
            "Failed to fetch restaurant details. Please try again later."
          );
          setLoading(false);
        }
      }
    };

    if (foodDetails) {
      fetchRestaurantDetails();
    }
  }, [foodDetails]);

  const handleAddToCart = async (foodId, event) => {
    try {
      event.preventDefault(); 
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
            customerId: userData.userId,
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
      alert("Item added to cart"); 
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-5 text-center fst-italic">
      <div className="container mx-5 my-5 shadow border rounded text-center row">
        <div className="col">
          <div className="container shadow bg-light py-2 my-5">
            <div className="Carousel">
              <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div
                    className="carousel-item active"
                    data-bs-interval="10000"
                  >
                    <img
                      src={foodDetails.foodImgUrl}
                      className="d-block w-100"
                      alt="..."
                      height="200px"
                      width="100px"
                    />
                  </div>
                  <div className="carousel-item" data-bs-interval="2000">
                    <img
                      src={foodDetails.foodImgUrl2}
                      className="d-block w-100"
                      alt="..."
                      height="200px"
                      width="100px"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={foodDetails.foodImgUrl3}
                      className="d-block w-100"
                      alt="..."
                      height="200px"
                      width="100px"
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container border rounded mx-1 my-5 py-5 px-1 shadow col-sm-5">
          {restaurantDetails ? (
            <form className="px-5">
              <div className="header fs-2 text-center mb-5 bg-primary text-light rounded-top">
                {restaurantDetails.restaurantName}
              </div>
              <p className="text-start fs-4">{foodDetails.name}</p>
              <div className="">
                <h3 className="my-2">Description:</h3>
                <p className="text-start">{foodDetails.description}</p>
              </div>
              <div className="">
                <h3 className="my-2">Restaurant Details:</h3>
                <p className="text-start">
                  Name : {restaurantDetails.restaurantName}
                </p>
                <p className="text-start">
                  Contact : {restaurantDetails.phoneNumber}
                </p>
                <p className="text-start">
                  Email-Id : {restaurantDetails.emailId}
                </p>
                <p className="text-start">
                  Address : {restaurantDetails.street}, {restaurantDetails.city}
                  , {restaurantDetails.pinCode}
                </p>
              </div>
              <hr />
              <div className="text-danger fs-4">
                Price : {foodDetails.price}/-
              </div>
              <div class="btn-group lg-rg mx-2 mt-5" role="group" aria-label="Basic example">
                <button
                  className="btn btn-primary px-4 py-2 fst-italic"
                  onClick={(event) =>
                    handleAddToCart(foodDetails.foodId, event)
                  }
                >
                  ADD TO CART
                </button>
                <Link
                  to="/customer/mycart"
                  className="btn btn-success px-4 py-2"
                >
                  GO TO CART
                </Link>
                <Link
                to="/customer/home"
                className="btn btn-warning px-4 py-2"
              >
                BACK
              </Link>
              </div>
              {/* <div className="lg-rg mx-2 mt-5">
                <button
                  className="btn btn-primary m-2 px-4 py-2"
                  onClick={(event) =>
                    handleAddToCart(foodDetails.foodId, event)
                  }
                >
                  ADD TO CART
                </button>
                <Link
                  to="/customer/mycart"
                  className="btn btn-success m-2 px-4 py-2"
                >
                  GO TO CART
                </Link>
              </div>

              <Link
                to="/customer/home"
                className="btn btn-danger m-2 px-4 py-2"
              >
                BACK
              </Link> */}
            </form>
          ) : (
            <p>No Restaurant Is Added</p>
          )}
        </div>

        <div className="container border rounded my-5 mx-1 py-5 shadow text-center col">
          <form className="px-2">
            <div className="header fs-2 text-center mb-5 bg-primary text-light rounded-top">
              Reviews
            </div>

            <table className="table text-start">
              <thead>
                <tr>
                  <th scope="col">Reviews</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Customer-1 5/5 * <br /> Very tasty
                  </td>
                </tr>
                {/* Add more review rows as needed */}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewFoodInfo;
