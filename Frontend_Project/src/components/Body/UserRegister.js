import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserRegister = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName:"",
    lastName:"",
    emailId: "",
    phoneNumber:"",
    street:"",
    city: "",
    pinCode: "",
    password: "",
  });

  const { firstName, lastName, emailId, phoneNumber, street, city, pinCode, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("User registered successfully");
        navigate("/Welcome/home");
        alert("User registered successfully"); 
      } else {
        console.error("Failed to register user:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div className="container border rounded my-5 py-5 shadow text-center ">
      <form className="px-5" onSubmit={(e) => onSubmit(e)}>
        <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
          REGISTER
        </div>
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your First name"
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
              placeholder="Enter Your Last name"
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
              placeholder="Enter Your Email-Id"
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
              placeholder="Enter Your Phone Number"
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
              placeholder="Enter Your Street"
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
              placeholder="Enter Your City"
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
              placeholder="Enter Your Pin Code"
              name="pinCode"
              value={pinCode}
              onChange={(e) => onInputChange(e)}
              aria-label="Pin Code"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Password"
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
          <Link to="/welcome/home" className="btn btn-danger mx-2 px-5">
              BACK
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
