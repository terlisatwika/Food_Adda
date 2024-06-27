import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Body/UserContext";

const ViewAllMyResOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userData } = useUser();

    useEffect(() => {
        const fetchOrdersByRestaurantId = async (restaurantId) => {
            try {
                const response = await fetch(`http://localhost:8080/vieworderbyrestaurantid/${restaurantId}`); 
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

        fetchOrdersByRestaurantId(userData.restaurantId);
    }, []);

    useEffect(() => {
        const fetchOrdersDetails = async () => {
            try {
                // Array to store promises for all fetch operations
                const promises = orders.map(async (order) => {
                    // Fetch food details
                    const foodResponse = await fetch(`http://localhost:8080/viewfoodbyid/${order.foodId}`);
                    if (!foodResponse.ok) {
                        throw new Error('Failed to fetch food details');
                    }
                    const foodData = await foodResponse.json();
    
                    // Fetch order details
                    const orderResponse = await fetch(`http://localhost:8080/orders/${order.orderId}`);
                    if (!orderResponse.ok) {
                        throw new Error('Failed to fetch order details');
                    }
                    const orderData = await orderResponse.json();
                    
                    // Return updated order object
                    return {
                        ...order,
                        foodName: foodData.name,
                        category: foodData.categoryName,
                        price: foodData.price,
                        customerId: orderData.customerId,
                        date: orderData.orderDate,
                        status: orderData.status
                    };
                });
    
                // Wait for all promises to resolve
                const updatedOrders = await Promise.all(promises);
                setOrders(updatedOrders);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
    
        if (orders.length > 0) {
            fetchOrdersDetails();
        }
    }, [orders]);
    
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
                    ALL MY RESTAURANT ORDERS
                    <div className="float-end fs-4 text-light my-3">
                        <Link to="/restaurant/home" className="btn btn-outline-light mx-2 px-3">
                            BACK
                        </Link>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div>No orders found.</div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Food</th>
                                <th scope="col">Food Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                {/* <th scope="col">Customer</th>
                                <th scope="col">Order Time</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">Delivery Person</th>
                                <th scope="col">Delivery Contact</th>
                                <th scope="col">Delivery Time</th>
                                <th scope="col">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td><img src={order.foodImgUrl} className="rounded" height="100px" width="120px" alt="Food" /></td>
                                    <td>{order.foodName}</td>
                                    <td>{order.category}</td>
                                    <td>{order.price}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.customerId}</td>
                                    <td>{order.date}</td>
                                    <td>{order.status}</td>
                                    <td>{order.deliveryPerson}</td>
                                    <td>{order.deliveryContact}</td>
                                    <td>{order.deliveryTime}</td>
                                    <td>
                                        {order.status === 'processing' && (
                                            <div className="lg-rg">
                                                <Link to="/restaurant/assigndeliveryperson" className="btn btn-warning mx-4">ASSIGN DELIVERY</Link>
                                            </div>
                                        )}
                                        {order.status === 'Delivered' && (
                                            <span>Delivery Assigned</span>
                                        )}
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

export default ViewAllMyResOrders;
