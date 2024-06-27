import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../Body/UserContext";

const ViewAllMyDeliveryPersons = () => {
  const [listOfDeliveryPersons, setListOfDeliveryPersons] = useState([]);
  const { userData } = useUser();
  const { id } = useParams();

  useEffect(() => {
    console.log("User data:", userData);
    if (userData && userData.restaurantId) {
      console.log("Restaurant ID:", userData.restaurantId);
      loadDeliveryPersons(userData.restaurantId);
    }
  }, [userData]);

  const loadDeliveryPersons = async (restaurantId) => {
    try {
      const response = await fetch(`http://localhost:8080/viewdeliverypersonbyres/${restaurantId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch delivery persons: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setListOfDeliveryPersons(data);
    } catch (error) {
      console.error("Error loading Delivery Persons:", error);
      setListOfDeliveryPersons([]); // Clear the list in case of error or handle differently
    }
  };

  const deleteDeliveryPerson = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/deldeliveryperson/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Delivery Person deleted successfully");
        loadDeliveryPersons(userData.restaurantId); // Reload delivery persons after deletion
      } else {
        console.error("Failed to delete delivery person:", response.statusText);
        // Handle failure: display error message or retry logic
      }
    } catch (error) {
      console.error("Error deleting delivery person:", error.message);
      // Handle error: display error message or retry logic
    }
  };

  return (
    <div className="container border rounded my-5 py-5 shadow text-center">
      <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
        ALL DELIVERY PERSONS
        <div className="float-end fs-4 text-light my-3">
          <Link to="/restaurant/home" className="btn btn-outline-light mx-2 px-3">
            BACK
          </Link>
        </div>
      </div>
      {listOfDeliveryPersons.length === 0 ? (
        <p>No Delivery Persons Added</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Phone No</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listOfDeliveryPersons.map((deliveryPerson) => (
              <tr key={deliveryPerson.deliveryPersonId}>
                <td>{deliveryPerson.firstName}</td>
                <td>{deliveryPerson.lastName}</td>
                <td>{deliveryPerson.emailId}</td>
                <td>{deliveryPerson.phoneNumber}</td>
                <td>{`${deliveryPerson.street}, ${deliveryPerson.city}, ${deliveryPerson.pinCode}`}</td>
                <td>
                  <div className="lg-rg mx-2">
                    <button
                      type="button"
                      className="btn btn-danger mx-2 px-4"
                      onClick={() => deleteDeliveryPerson(deliveryPerson.deliveryPersonId)}
                    >
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
  );
};

export default ViewAllMyDeliveryPersons;
