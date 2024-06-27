import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../Body/UserContext";

const ViewMyFood = () => {
  const [listOfFoods, setListOfFoods] = useState([]);
  const { userData } = useUser(); // Ensure useUser is correctly imported and used
  const { id } = useParams();

  useEffect(() => {
    console.log("User Data:", userData); // Check if userData is defined here
    if (userData && userData.restaurantId) {
      loadFoods(userData.restaurantId);
    }
  }, [userData]);

  const loadFoods = async (restaurantId) => {
    try {
      const result = await fetch(`http://localhost:8080/viewfoodbyres/${restaurantId}`);
      if (!result.ok) {
        throw new Error(`Failed to fetch foods. Status: ${result.status}`);
      }
      const jsonObj = await result.json();
      console.log("Fetched foods:", jsonObj); // Check fetched data
      setListOfFoods(jsonObj);
    } catch (error) {
      console.error("Error loading foods:", error);
    }
  };

  const deleteFood = async (foodId) => {
    try {
      const response = await fetch(`http://localhost:8080/delfood/${foodId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Food deleted successfully");
        loadFoods(userData.restaurantId); // Reload foods after deletion
      } else {
        console.error("Failed to delete Food:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting Food:", error.message);
    }
  };

  return (
    <>
      <div className="container border rounded my-5 py-5 shadow text-center ">
        <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
          MY FOODS
          <div className="float-end fs-4  text-light my-3">
            <Link to="/restaurant/home" className="btn btn-outline-light mx-2 px-3">
              BACK
            </Link>
          </div>
        </div>
        {listOfFoods.length === 0 ? (
          <p>No Food Is Added</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Food</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listOfFoods.map((food) => (
                <tr key={food.foodId}>
                  <td>
                    <img
                      src={food.foodImgUrl}
                      alt={`${food.name} image`}
                      className="rounded"
                      height="120px"
                      width="150px"
                    />
                  </td>
                  <td>{food.name}</td>
                  <td>{food.description}</td>
                  <td>{food.categoryName}</td>
                  <td>{food.price}</td>
                  <td>
                    <div className="lg-rg mx-2 ">
                      <Link
                        to={`/restaurant/updatefood/${food.foodId}`}
                        className="btn btn-warning mx-2 px-3 m-2"
                      >
                        UPDATE
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger mx-2 px-4"
                        size="3"
                        onClick={() => deleteFood(food.foodId)}>
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewMyFood;
