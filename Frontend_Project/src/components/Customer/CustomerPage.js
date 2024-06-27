import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Body/UserContext";

export const CustomerHeader = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary ">
        <div className="container-fluid">
          <span className=" title navbar-brand fs-2 text-primary border shadow px-5">
            Food ADDA
          </span>
          <div className="btn-group ">
            <Link
              to="/customer/mycart"
              className="btn btn-primary"
              aria-expanded="false"
            >
              MY CART
            </Link>
          </div>
          <div className="btn-group">
            <Link
              to="/customer/myorders"
              className="btn btn-primary"
              aria-expanded="false"
            >
              MY ORDERS
            </Link>
          </div>
          <div className="lg-rg bg-primary mx-2 px-2">
            <Link to="/welcome/home" className="btn btn-danger mx-2">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

// -----------------------------------------------------------------My Cart-----------------------------------------------------------------------


export const MyCart = () => {
  const { userData } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData.userId) {
      fetchCartItems(userData.userId);
    } else {
      setLoading(false);
    }
  }, [userData.userId]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/viewcartitems/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      setCartItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + (item.foodDetails ? item.foodDetails.price * item.quantity : 0),
      0
    );
    setTotalPrice(total);
  };

  const fetchFoodDetails = async (foodId) => {
    try {
      const response = await fetch(`http://localhost:8080/viewfoodbyid/${foodId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch food details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching food details:", error);
      return null;
    }
  };

  const fetchFoodDetailsForCartItems = async () => {
    const updatedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const foodDetails = await fetchFoodDetails(item.foodId);
        return { ...item, foodDetails };
      })
    );
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      fetchFoodDetailsForCartItems();
    }
  }, [cartItems]);

  const handleQuantityChange = async (event, cartId) => {
    const newQuantity = parseInt(event.target.value);
    const updatedCartItems = cartItems.map((item) =>
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);

    try {
      const response = await fetch(`http://localhost:8080/updatecartitem/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update quantity: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDeleteItem = async (cartId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Item deleted successfully");
        fetchCartItems(userData.userId);
      } else {
        console.error("Failed to delete item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8080/placeOrder/${userData.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });
      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.status} - ${response.statusText}`);
      }
      setCartItems([]);
      setTotalPrice(0);
      window.location.href = "/customer/orderplaced";
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container border rounded my-5 py-5 shadow text-center">
      <div className="header fs-1 text-center py-3 mb-5 bg-primary text-light rounded-top">
        MY CART
        <div className="float-end fs-4 text-light my-3">
          <Link to="/customer/home" className="btn btn-outline-light mx-2 px-3">
            BACK
          </Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Food</th>
            <th scope="col">Food Name</th>
            <th scope="col">Category</th>
            <th scope="col">Restaurant</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item.cartId}>
                <td>
                  {item.foodDetails && (
                    <img
                      src={item.foodDetails.foodImgUrl}
                      className="rounded"
                      height="100px"
                      width="120px"
                      alt="Food Item"
                    />
                  )}
                </td>
                <td>{item.foodDetails ? item.foodDetails.name : "No Name"}</td>
                <td>{item.foodDetails ? item.foodDetails.categoryName : "No Category"}</td>
                <td>{item.foodDetails ? item.foodDetails.restaurantId : "No Restaurant"}</td>
                <td>{item.foodDetails ? `${item.foodDetails.price}/-` : "No Price"}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="1"
                    value={item.quantity}
                    min="1"
                    max="20"
                    onChange={(e) => handleQuantityChange(e, item.cartId)}
                  />
                </td>
                <td>
                  <div className="lg-rg mx-2">
                    <button
                      type="button"
                      className="btn btn-danger mx-2 px-4"
                      onClick={() => handleDeleteItem(item.cartId)}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No items in cart</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="footer text-end bg-dark text-light rounded">
        <p className="my-2 px-5 p-2 fs-4">Total Price : {totalPrice} /-</p>
        <button
          className="btn btn-success fs-4 mx-5 m-2 mb-3 px-4"
          onClick={placeOrder}
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};


// -----------------------------------------------------------------Payment Portal-----------------------------------------------------------------------

export const PaymentPortal = () => {
  const navigate = useNavigate();
  const {userData} = useUser();
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const cardName = document.getElementById("nameofcard").value;
    const cardNumber = document.getElementById("cardno").value;
    const expiryDate = document.getElementById("expirydate").value;
    const cvv = document.getElementById("cvv").value;

    try {
      const response = await fetch(`http://localhost:8080/placeOrder/${userData.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardName,
          cardNumber,
          expiryDate,
          cvv,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.statusText}`);
      }

      // Clear form fields after successful submission
      document.getElementById("nameofcard").value = "";
      document.getElementById("cardno").value = "";
      document.getElementById("expirydate").value = "";
      document.getElementById("cvv").value = "";

      navigate("/customer/orderplaced");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="paymentportal" style={{ display: "flex", justifyContent: "center" }}>
      <div className="payment border rounded mx-5 my-5 py-5 shadow text-center " style={{ height: "auto", width: "400px" }}>
        <form className="px-5" onSubmit={onSubmit}>
          <div className="header fs-4 text-center p-3 mb-5 bg-primary text-light rounded-top">
            PAYMENT DETAILS
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              id="nameofcard"
              placeholder="Enter Your Card Name"
              aria-describedby="textHelp"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              className="form-control"
              id="cardno"
              placeholder="Enter Your Card Number"
              aria-describedby="textHelp"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              className="form-control"
              id="expirydate"
              placeholder="Enter Your Card Expiry Date"
              aria-describedby="textHelp"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your CVV"
              id="cvv"
              maxLength={3}
              required
            />
          </div>
          <div className="lg-rg mx-2 mt-5">
            <button type="submit" className="btn btn-primary mx-2 px-5">
              PAY
            </button>
            <Link to="/customer/mycart" className="btn btn-primary mx-2 px-4">
              BACK
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
// -----------------------------------------------------------Payment successful and order placed-----------------------------------------------------------

export const OrderPlaced = () => {
  return (
    <div className="container border rounded my-5 py-5 shadow text-center ">
      <div className="header fs-1 text-center mb-5 text-success rounded-top">
      Order Placed Successfully !!!
      </div>
      <div className="footer text-center text-light rounded">
        <Link
          to="/customer/home"
          className="btn btn-secondary mx-5 m-2 mb-3 px-4"
        >
          Click Here to go to home page
        </Link>
        <Link
          to="/customer/myorders"
          className="btn btn-secondary mx-5 m-2 mb-3 px-4"
        >
          Click Here to go to my orders
        </Link>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------My Orders-------------------------------------------------------------------

// export const MyOrders = () => {
  
//   const [orders, setOrders] = useState([]); // State to hold orders data
//   const [loading, setLoading] = useState(true); // State to track loading state
//   const [error, setError] = useState(null); // State to track error state
//   const [foodDetails, setFoodDetails] = useState(null);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const fetchOrdersByUserId = async (userId) => {
//       try {
//         const response = await fetch(`http://localhost:8080/orderbyuserid/${userId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const data = await response.json();
//         setOrders(data); // Set fetched orders into state
//         setLoading(false); // Update loading state to false
//       } catch (error) {
//         setError(error.message); // Set error message if fetch fails
//         setLoading(false); // Update loading state to false
//       }
//     };

//     const userId = 52; // Replace with actual userId (you can get it from authentication)
//     fetchOrdersByUserId(userId); // Fetch orders when component mounts
//   }, []);

//   useEffect(() => {
//     const fetchFoodDetails = async (foodId) => {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://localhost:8080/viewfoodbyid/${foodId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch food details");
//         }
//         const data = await response.json();
//         setFoodDetails(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching food details:", error);
//         setError("Failed to fetch food details. Please try again later.");
//         setLoading(false);
//       }
//     };

//   if (cart.foodId) {
//     fetchFoodDetails(cart.foodId); // Pass cart.foodId to fetchFoodDetails
//   }
// }, [cart.foodId]);
  
  
//   useEffect(() => {
//     const fetchCartItems = async (userId) => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/viewcartitems/${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch cart items");
//         }
//         const data = await response.json();
//         setCart(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         setLoading(false); // Also set loading to false on error
//       }
//     };
//     const userId =52;
//       fetchCartItems(userId);
   
//   }, []);

  

//   if (loading) {
//     return <div>Loading...</div>; // Display loading message while fetching data
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Display error message if fetch fails
//   }

//   return (
//     <>
//       <div className="container border rounded my-5 p-2 shadow text-center">
//         <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
//           MY ORDERS
//           <div className="float-end fs-4 text-light my-3">
//             <Link to="/customer/home" className="btn btn-outline-light mx-2 px-3">
//               BACK
//             </Link>
//           </div>
//         </div>

//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">Order Id</th>
//               <th scope="col">Food</th>
//               <th scope="col">Food Name</th>
//               <th scope="col">Category</th>
//               <th scope="col">Restaurant</th>
//               <th scope="col">Price</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Order Time</th>
//               <th scope="col">Order Status</th>
//               <th scope="col">Delivery Person</th>
//               <th scope="col">Delivery Contact</th>
//               <th scope="col">Delivery Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.orderId}>
//                 <td>{order.orderId}</td>
//                 <td>
//                   <img
//                     src={order.foodImgUrl}
//                     className="rounded"
//                     height="100px"
//                     width="120px"
//                     alt="Food"
//                   />
//                 </td>
//                 <td>{order.foodName}</td>
//                 <td>{order.category}</td>
//                 <td>{order.restaurantName}</td>
//                 <td>{order.price}</td>
//                 <td>{order.quantity}</td>
//                 <td>{order.orderTime}</td>
//                 <td>{order.orderStatus}</td>
//                 <td>{order.deliveryPerson}</td>
//                 <td>{order.deliveryContact}</td>
//                 <td>{order.deliveryTime}</td>
//               </tr>
//             ))}
//             <tr>
//               <td>Los2657214</td>
//               <td>
//                 <img
//                   src="https://cdn.pixabay.com/photo/2022/03/02/12/40/dish-7043065_1280.jpg"
//                   className="rounded"
//                   height="100px"
//                   width="120px"
//                 />
//               </td>
//               <td>Pot Biryani</td>
//               <td>Chicken</td>
//               <td>Restaurant-1</td>
//               <td>299</td>
//               <td>2</td>
//               <td>10/20/20 5:30:45 pm</td>
//               <td>Delivered</td>
//               <td>deliveryperson1</td>
//               <td>8472498</td>
//               <td>10/20/20</td>
//             </tr>
//             <tr>
//               <td>Los2657214</td>
//               <td>
//                 <img
//                   src="https://cdn.pixabay.com/photo/2022/03/02/12/40/dish-7043065_1280.jpg"
//                   className="rounded"
//                   height="100px"
//                   width="120px"
//                 />
//               </td>
//               <td>Pot Biryani</td>
//               <td>Chicken</td>
//               <td>Restaurant-1</td>
//               <td>299</td>
//               <td>2</td>
//               <td>10/20/20 5:30:45 pm</td>
//               <td>Delivered</td>
//               <td>deliveryperson1</td>
//               <td>8472498</td>
//               <td>10/20/20</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userData} = useUser();

  useEffect(() => {
    const fetchOrdersByUserId = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8080/orderbyuserid/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // const userId = 52; 
    fetchOrdersByUserId(userData.userId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container border rounded my-5 p-2 shadow text-center">
        <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
          MY ORDERS
          <div className="float-end fs-4 text-light my-3">
            <Link to="/customer/home" className="btn btn-outline-light mx-2 px-3">
              BACK
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          orders.map(order => (
            <OrderDetails key={order.orderId} order={order} />
          ))
        )}
      </div>
    </>
  );
};

const OrderDetails = ({ order }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderItems = async (orderId) => {
      try {
        const response = await fetch(`http://localhost:8080/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order items');
        }
        const data = await response.json();
        setOrderItems(data.orderItems); // Assuming response contains orderItems
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrderItems(order.orderId); // Fetch order items when component mounts
  }, [order.orderId]);

  useEffect(() => {
    const fetchFoodDetails = async (foodId) => {
      try {
        const response = await fetch(`http://localhost:8080/viewfoodbyid/${foodId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food details');
        }
        const data = await response.json();
        const updatedOrderItems = orderItems.map(item => {
          if (item.foodId === foodId) {
            return {
              ...item,
              foodName: data.name, 
              category: data.categoryName,
              price: data.price,
            };
          }
          return item;
        });
        setOrderItems(updatedOrderItems);
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    };

    // Fetch food details for each order item when orderItems change
    if (orderItems.length > 0) {
      orderItems.forEach(item => {
        fetchFoodDetails(item.foodId);
      });
    }
  }, [orderItems]);

  return (
    <div className="my-5">
      {loading ? (
        <div>Loading order items...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Food</th>
              <th scope="col">Food Name</th>
              <th scope="col">Category</th>
              <th scope="col">Restaurant</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Order Time</th>
              <th scope="col">Order Status</th>
              <th scope="col">Delivery Person</th>
              <th scope="col">Delivery Contact</th>
              <th scope="col">Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map(item => (
              <tr key={item.orderItemId}>
                <th>{order.orderId}</th>
                <td>
                  <img
                    src={item.foodImgUrl} // Assuming foodImgUrl is part of order item
                    className="rounded"
                    height="100px"
                    width="120px"
                    alt="Food"
                  />
                </td>
                <td>{item.foodName}</td> {/* Display foodName fetched from backend */}
                <td>{item.category}</td>
                <td>{item.restaurantId}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{order.orderDate}</td>
                <td>{order.status}</td>
                <td>{order.status}</td>
                <td>{order.status}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderDetails;

