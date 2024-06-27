import React from "react";
import { Link } from "react-router-dom";

const RestaurantHeader = () => {
    return(
        <>   
        <nav className="navbar navbar-dark bg-primary ">
        <div className="container-fluid">
            <span className=" title navbar-brand fs-2 text-primary border shadow px-5">Food ADDA</span>
            <div className="btn-group ">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    MY FOOD
                </button>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/restaurant/addfood">Add Food</Link></li>
                  <li><Link className="dropdown-item" to="/restaurant/viewmyfoods">View & Delete Food</Link></li>
                </ul>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    DELIVERY PERSON
                </button>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/restaurant/deliverypersonregister">Register Delivery Person</Link></li>
                  <li><Link className="dropdown-item" to="/restaurant/viewallresdeliveryper">View Delivery Person Details </Link></li>
                </ul>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    ORDERS
                </button>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/restaurant/viewallrestaurantorders">View Orders</Link></li>
                </ul>
              </div>
            <div className="lg-rg bg-primary mx-2 px-2">
                <Link to="/welcome/home" className="btn btn-danger   mx-2">Logout</Link>
            </div>
        </div>
        </nav>
        </>
    )
}
export default RestaurantHeader;
