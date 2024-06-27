import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Body/UserContext";

const AssignDeliveryPerson = () => {
  const [orderId, setOrderId] = useState("");
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState("");
  const [error, setError] = useState(null);
  const { userData } = useUser(); // Assuming this provides the current user's details including restaurantId

  useEffect(() => {
    const fetchDeliveryPersons = async () => {
      try {
        if (!userData.restaurantId) return; // Ensure restaurantId is available

        const response = await fetch(`http://localhost:8080/viewdeliverypersonbyres/${userData.restaurantId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch delivery persons");
        }
        const data = await response.json();
        setDeliveryPersons(data); // Update deliveryPersons state with fetched data
      } catch (error) {
        console.error("Error fetching delivery persons:", error);
        setError("Failed to fetch delivery persons. Please try again later.");
      }
    };

    fetchDeliveryPersons();
  }, [userData.restaurantId]);

  const handleAssignDeliveryPerson = async () => {
    try {
      // Validate orderId and selectedDeliveryPerson
      if (!orderId.trim()) {
        setError("Please enter an Order ID");
        return;
      }
      if (!selectedDeliveryPerson) {
        setError("Please select a Delivery Person");
        return;
      }

      // Perform API call to assign delivery person
      const response = await fetch(`http://localhost:8080/assignDeliveryPerson`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId.trim(),
          deliveryPersonId: selectedDeliveryPerson,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign delivery person");
      }

      // Reset form fields and error state
      setOrderId("");
      setSelectedDeliveryPerson("");
      setError(null);

      // Redirect or show success message as needed
      // Example: Redirect to view all restaurant orders page
      history.push("/restaurant/viewallrestaurantorders");
    } catch (error) {
      console.error("Error assigning delivery person:", error);
      setError("Failed to assign delivery person. Please try again later.");
    }
  };

  return (
    <>
      <div className="container border rounded my-5 py-5 shadow text-center" style={{ height: 'auto', width: '550px' }}>
        <form className="px-5">
          <div className="header fs-3 text-center mb-5 p-2 px-1 bg-primary text-light rounded-top">
            ASSIGN DELIVERY PERSON
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label htmlFor="orderId" className="form-label">Order ID</label>
            <input
              type="text"
              className="form-control"
              id="orderId"
              placeholder="Enter Order Id"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              aria-describedby="orderIdHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deliveryPerson" className="form-label">Delivery Person</label>
            <select
              className="form-select"
              id="deliveryPerson"
              value={selectedDeliveryPerson}
              onChange={(e) => setSelectedDeliveryPerson(e.target.value)}
              aria-label="Select Delivery Person"
            >
              <option value="">Select Delivery Person</option>
              {deliveryPersons.map((data)=> (
                <option key={data.deliveryPersonId} value={data.deliveryPersonId}>
                  {data.firstName} {data.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="lg-rg mx-2 mt-5">
            <button
              type="button"
              className="btn btn-primary mx-2 px-3"
              onClick={handleAssignDeliveryPerson}
            >
              ASSIGN
            </button>
            <Link
              to="/restaurant/viewallrestaurantorders"
              className="btn btn-danger mx-2 px-4"
            >
              BACK
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AssignDeliveryPerson;
