import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Body/UserContext";

const RegisterDeliveryPerson = () => {
  let navigate = useNavigate();
  const { userData } = useUser();

  const initialDeliveryPersonState = {
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    street: "",
    city: "",
    pinCode: "",
    password: "",
    restaurantId: userData ? userData.restaurantId : "" // Ensure user and user.restaurantId exist
  };

  const [deliveryPerson, setDeliveryPerson] = useState(initialDeliveryPersonState);

  const {
    firstName,
    lastName,
    emailId,
    phoneNumber,
    street,
    city,
    pinCode,
    password,
    restaurantId
  } = deliveryPerson;

  const onInputChange = (e) => {
    setDeliveryPerson({ ...deliveryPerson, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/adddeliveryperson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deliveryPerson)
      });

      if (response.ok) {
        console.log("Delivery Person registered successfully");
        navigate("/restaurant/viewallresdeliveryper");
      } else {
        console.error("Failed to register delivery person:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering delivery person:", error.message);
    }
  };

  return (
    <div className="container border rounded my-5 py-5 shadow text-center">
      <form className="px-5" onSubmit={(e) => onSubmit(e)}>
        <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
          REGISTER
        </div>
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter First name"
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChange(e)}
              aria-label="First name"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last name"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
              aria-label="Last name"
              required
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email-Id"
              name="emailId"
              value={emailId}
              onChange={(e) => onInputChange(e)}
              aria-label="Email-Id"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => onInputChange(e)}
              aria-label="Phone Number"
              required
            />
          </div>
        </div>
        <div className="header fs-4 mb-3 text-left">ADDRESS</div>
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Street"
              name="street"
              value={street}
              onChange={(e) => onInputChange(e)}
              aria-label="Street"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter City"
              name="city"
              value={city}
              onChange={(e) => onInputChange(e)}
              aria-label="City"
              required
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Pin Code"
              name="pinCode"
              value={pinCode}
              onChange={(e) => onInputChange(e)}
              aria-label="Pin Code"
              required
            />
          </div>
          <div className="col">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
              aria-label="Password"
              required
            />
          </div>
        </div>
        <div className="lg-rg mx-2 mt-5">
          <button type="submit" className="btn btn-primary mx-2 px-5">
            REGISTER
          </button>
          <Link to="/restaurant/home" className="btn btn-danger mx-2 px-5">
            BACK
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterDeliveryPerson;
