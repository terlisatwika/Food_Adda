import React from "react";
import { Link } from "react-router-dom";

export const DeliveryPersonHeader = () => {
  return (
    <nav className="navbar navbar-dark bg-primary ">
      <div className="container-fluid">
        <span className=" title navbar-brand fs-2 text-primary border shadow px-5">
          Food ADDA
        </span>
        <div className="btn-group ">
          <Link
            to="/deliveryperson/mydeliveryorder"
            className="btn btn-primary"
            aria-expanded="false"
          >
            MY DELIVERY ORDERS
          </Link>
        </div>
        <div className="lg-rg bg-primary mx-2 px-2">
          <Link to="/welcome/home" className="btn btn-danger mx-2">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

// ----------------------------------------------------------My Delivery Orders---------------------------------------------------------------

export const MyDeliveryOrders = () => {
  return (
    <div className="container border rounded my-5 p-2 shadow text-center ">
      <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
        ALL DELIVERY ORDERS
        <div className="float-end fs-4  text-light my-3">
          <Link
            to="/deliveryperson/home"
            className="btn btn-outline-light mx-2 px-3"
          >
            BACK
          </Link>
        </div>
      </div>

      <div className="container search-bar">
            <form className="d-flex" style={{justifyContent:"center", textAlign:"center"}}>
                <input className="form-control px-5 mx-2 shadow" list="" type="search" placeholder="Search"
                    aria-label="Search" style={{width:"500px"}}/>
                <button className="btn btn-outline-primary shadow" type="submit">Search</button>
            </form>
        </div>
        <hr className="border border-primary border-1 opacity-75 mx-5 " />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Food</th>
            <th scope="col">Food Name</th>
            <th scope="col">Category </th>
            <th scope="col">Restaurant </th>
            <th scope="col">Price </th>
            <th scope="col">Quantity </th>
            <th scope="col">Customer</th>
            <th scope="col">Order Time </th>
            <th scope="col">Order Status </th>
            <th scope="col">Delivery Person </th>
            <th scope="col">Delivery Contact </th>
            <th scope="col">Delivery Time </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Los2657214</td>
            <td>
              <img
                src="https://cdn.pixabay.com/photo/2022/03/02/12/40/dish-7043065_1280.jpg"
                className="rounded"
                height="100px"
                width="120px"
              />
            </td>
            <td>Pot Biryani</td>
            <td>Chicken</td>
            <td>Restaurant-1</td>
            <td>299</td>
            <td>2</td>
            <td>customer-1</td>
            <td>10/20/20 5:30:45 pm</td>
            <td>Delivered</td>
            <td>deliveryperson1</td>
            <td>8472498</td>
            <td>processing</td>
            <td>
              <div className="lg-rg mx-2 ">
                <Link
                  to="/deliveryperson/updatedeliverystatus"
                  className="btn btn-warning mx-2 px-4"
                >
                  Update Status
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td>Los2657214</td>
            <td>
              <img
                src="https://cdn.pixabay.com/photo/2022/03/02/12/40/dish-7043065_1280.jpg"
                className="rounded"
                height="100px"
                width="120px"
              />
            </td>
            <td>Pot Biryani</td>
            <td>Chicken</td>
            <td>Restaurant-1</td>
            <td>299</td>
            <td>2</td>
            <td>customer-1</td>
            <td>10/20/20 5:30:45 pm</td>
            <td>Delivered</td>
            <td>deliveryperson1</td>
            <td>8472498</td>
            <td>processing</td>
            <td>Delivered</td>
          </tr>
          <tr>
            <td>Los2657214</td>
            <td>
              <img
                src="https://cdn.pixabay.com/photo/2022/03/02/12/40/dish-7043065_1280.jpg"
                className="rounded"
                height="100px"
                width="120px"
              />
            </td>
            <td>Pot Biryani</td>
            <td>Chicken</td>
            <td>Restaurant-1</td>
            <td>299</td>
            <td>2</td>
            <td>customer-1</td>
            <td>10/20/20 5:30:45 pm</td>
            <td>Delivered</td>
            <td>deliveryperson1</td>
            <td>8472498</td>
            <td>processing</td>
            <td>
              <div className="lg-rg mx-2 ">
                <Link
                  to="/deliveryperson/updatedeliverystatus"
                  className="btn btn-warning mx-2 px-4">
                  Update Status
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ----------------------------------------------------------My Delivery Orders---------------------------------------------------------------

export const UpdateDeliveryStatus = () => {
  return (
    <>
      <div className="updatedeliverystatus" style={{ display:"flex", justifyContent:"center" }}>
        <div
          className="payment border rounded mx-5 my-5 p-2 shadow text-center "
          style={{height: "auto",width: "550px"}}>
          <form className="p-2">
            <div className="header fs-4 text-center mb-5  px-2 py-4 bg-primary text-light rounded-top">
              UPDATE DELIVERY STATUS
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                id="orderid"
                placeholder="Order Id"
                aria-describedby="textHelp"
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                className="form-control"
                id="date"
                aria-describedby="textHelp"
              />
            </div>
            <div className="mb-4">
              <input
                type="time"
                className="form-control"
                id="time"
                placeholder=""
                aria-describedby="textHelp"
              />
            </div>
            <div className="mb-4">
              <select
                className="form-select form-select-md mb-3"
                aria-label="Large select example"
              >
                <option selected>Select Delivery Status</option>
                <option value="pending">Cancelled</option>
                <option value="delivered">Delivered</option>
                <option value="ontheway">On the Way</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
              </select>
            </div>
            <div className="lg-rg my-3">
              <button type="button" className="btn btn-primary mx-2">
                UPDATE
              </button>
              <Link to="/deliveryperson/mydeliveryorder" className="btn btn-danger mx-2">BACK</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
