import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AdminHeader = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary ">
        <div className="container-fluid">
         <span className=" title navbar-brand fs-2 text-primary border shadow px-5">Food ADDA</span>
          <div className="btn-group ">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              CATEGORY
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/admin/addcategory">
                  Add Category
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/admin/viewcategory">
                  View & Delete Category
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/admin/viewallfood">
                  View All Foods
                </Link>
              </li>
            </ul>
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              RESTAURANTS
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/admin/viewallrestaurants">
                  View & Delete Restaurant
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/admin/viewalldeliverypersons">
                  View Delivery Person Details
                </Link>
              </li>
            </ul>
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              CUSTOMERS
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/admin/viewallcustomers">
                  View Customers
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/admin/viewallcustomerorders">
                  View Customer Orders
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg-rg bg-primary mx-2 px-2">
            <Link to="/admin/adminregister">
              <button type="button" className="btn  btn-outline-light mx-2">
                Register
              </button>
            </Link>
            <Link to="/welcome/home" className="btn btn-danger mx-2">
                Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

// ----------------------------------------------------------------Category-------------------------------------------------------------------

export const AddCategory = () => {
  let navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    categoryImg: "",
    description: "",
  });

  const { name, categoryImg, description } = category;

  const onInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/addcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        console.log("Added category successfully");
        navigate("/admin/viewcategory");
      } else {
        console.error("Failed to add category:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };
  return (
    <>
      <div className="container border rounded my-5 py-5 shadow text-center ">
        <form className="px-5" onSubmit={(e) => onSubmit(e)}>
          <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
            ADD CATEGORY
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">
              Category Title
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryTitle"
              placeholder="Enter Category Title"
              aria-describedby="textHelp"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-3">
            <label for="categoryImg" className="form-label">
              Category Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryImg"
              placeholder="Enter Category Image URL"
              aria-describedby="textHelp"
              name="categoryImg"
              value={categoryImg}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-3">
            <label for="Textarea">Category Description</label>
            <textarea
              className="form-control"
              id="Textarea"
              rows="3"
              placeholder="Enter Category Description..."
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>
          <div className="lg-rg mx-2 mt-5">
            <button type="submit" className="btn btn-primary mx-2 px-3">
              ADD
            </button>
            <Link to="/admin/home" className="btn btn-danger mx-2 px-4">
              BACK
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export const ViewCategory = () => {
  const [listOfCategories, setListOfCategories] = useState([]);

  // const { id } = useParams();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await fetch("http://localhost:8080/viewcategories");
      const jsonObj = await result.json();
      // console.log(jsonObj);
      setListOfCategories(jsonObj);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/categoryd/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listOfCategories),
      });
      if (response.ok) {
        console.log("Category deleted successfully");
      } else {
        console.error("Failed to delete category:", response.statusText);
      }

      loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  return (
    <div className="container border rounded my-5 py-5 shadow text-center ">
      <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
        ALL CATEGORIES
        <div className="float-end fs-4  text-light my-3">
          <Link to="/admin/home" className="btn btn-outline-light mx-2 px-3">
            BACK
          </Link>
        </div>
      </div>
      {listOfCategories.length === 0 ? (
        <p>No Category Is Added</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Category ID</th>
              <th scope="col">Category</th>
              <th scope="col">Category Name</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listOfCategories.map((category) => (
              <tr>
                <th scope="row">{category.categoryId}</th>
                <td>
                  <img
                    src={category.categoryImg}
                    className="rounded"
                    height="120px"
                    width="150px"
                  />
                </td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <div className="lg-rg mx-2 ">
                    <Link to={`/admin/updatecategory/${category.categoryId}`}>
                      <button
                        type="button"
                        className="btn btn-warning mx-2 px-3 my-1"
                        size="3"
                      >
                        UPDATE
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger mx-2 px-3 my-1"
                      size="3"
                      onClick={() => deleteCategory(category.categoryId)}>
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

export const UpdateCategory = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [category, setCategory] = useState({
    name: "",
    categoryImg: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  const { name, categoryImg, description } = category;

  const onInputChange = (e) => {
    // console.log("Input change:", e.target.value);
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const result = await fetch(`http://localhost:8080/categorybyid/${id}`);
        const jsonObj = await result.json();
        setCategory(jsonObj);
        setLoading(false);
      } catch (error) {
        console.error("Error loading category:", error);
      }
    };
    loadCategory();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with category:", category);
    try {
      const response = await fetch(`http://localhost:8080/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        console.log("Category updated successfully");
        navigate("/admin/viewcategory");
      } else {
        console.error("Failed to update category:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating category:", error.message);
    }
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div className="container border rounded my-5 py-5 shadow text-center ">
        <form className="px-5" onSubmit={(e) => onSubmit(e)}>
          <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
            UPDATE CATEGORY
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">
              Category Title
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryTitle"
              placeholder="Enter Category Title"
              aria-describedby="textHelp"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-3">
            <label for="categoryImg" className="form-label">
              Category Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryImg"
              placeholder="Enter Category Image URL"
              aria-describedby="textHelp"
              name="categoryImg"
              value={categoryImg}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-3">
            <label for="Textarea">Category Description</label>
            <textarea
              className="form-control"
              id="Textarea"
              rows="3"
              placeholder="Enter Category Description..."
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>
          <div className="lg-rg mx-2 mt-5">
            <button type="submit" className="btn btn-primary mx-2 px-3">
              UPDATE
            </button>
            <Link to="/admin/viewcategory" className="btn btn-danger mx-2 px-4">
              BACK
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export const ViewAllFoods = () => {
  const [listOfFoods, setListOfFoods] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await fetch("http://localhost:8080/viewallfoods");
      const jsonObj = await result.json();
      setListOfFoods(jsonObj);
    } catch (error) {
      console.error("Error loading foods:", error);
    }
  };
  return (
    <div className="container border rounded my-5 py-5 shadow text-center ">
      <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
        ALL FOODS
        <div className="float-end fs-4  text-light my-3">
          <Link to="/admin/home" className="btn btn-outline-light mx-2 px-3">
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
            <th scope="col">Food Id</th>
            <th scope="col">Food</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Restaurant</th>
          </tr>
        </thead>
        <tbody>
        {listOfFoods.map((food) => (
              <tr>
                <th scope="row">{food.foodId}</th>
                <td><img src={food.foodImgUrl}  className="rounded" height="120px" width="150px"/></td>
                <td>{food.name}</td>
                <td>{food.description}</td>
                <td>{food.categoryName}</td>
                <td>{food.price}</td>
                <td>{food.restaurantId}</td>
              </tr>
            ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

// ----------------------------------------------------------------Restaurants-------------------------------------------------------------------

export const ViewAllRestaurants = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const result = await fetch("http://localhost:8080/allrestaurants");
      const jsonObj = await result.json();
      // console.log(jsonObj);
      setListOfRestaurants(jsonObj);
    } catch (error) {
      console.error("Error loading restaurant:", error);
    }
  };
  
  const deleteRestaurant = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/delrestaurant/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listOfRestaurants),
      });
      if (response.ok) {
        console.log("Restaurant deleted successfully");
      } else {
        console.error("Failed to delete Restaurant:", response.statusText);
      }

      loadRestaurants();
    } catch (error) {
      console.error("Error deleting Restaurant:", error.message);
    }
  };

  return (
    <div className="container border rounded my-5 py-5 shadow text-center ">
      <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
        ALL RESTAURANTS
        <div className="float-end fs-4  text-light my-3">
          <Link to="/admin/home">
            <button type="button" className="btn btn-outline-light mx-2 px-3">
              BACK
            </button>
          </Link>
        </div>
      </div>
      {listOfRestaurants.length === 0 ? (
        <p align="center">No Restaurants</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Restaurant ID</th>
              <th scope="col">Restaurant Name</th>
              <th scope="col">Owner Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Phone No </th>
              <th scope="col">Address </th>
              <th scope="col">Action </th>
            </tr>
          </thead>
          <tbody>
            {listOfRestaurants.map((restaurant) => (
              <tr>
                <th>{restaurant.restaurantId}</th>
                <td>{restaurant.restaurantName}</td>
                <td>{restaurant.ownerName}</td>
                <td>{restaurant.emailId}</td>
                <td>{restaurant.phoneNumber}</td>
                <td>
                  {restaurant.street}, {restaurant.city}, {restaurant.pinCode}
                </td>
                <td>
                  <div className="lg-rg mx-2 ">
                      <button
                        type="button"
                        className="btn btn-danger mx-2 px-4"
                        onClick={() => deleteRestaurant(restaurant.restaurantId)}>
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

export const ViewAllDeliveryPersons = () => {
  const [listOfDeliveryPersons, setListOfDeliveryPersons] = useState([]);

  useEffect(() => {
    loadAllDeliveryPersons();
  }, []);

  const loadAllDeliveryPersons = async () => {
    try {
      const result = await fetch("http://localhost:8080/alldeliverypersons");
      const jsonObj = await result.json();
      console.log(jsonObj);
      setListOfDeliveryPersons(jsonObj);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };
  return (
    <div className="container border rounded my-5 py-5 shadow text-center ">
      <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
        ALL DELIVERY PERSONS
        <div className="float-end fs-4  text-light my-3">
          <Link to="/admin/home">
            <button type="button" className="btn btn-outline-light mx-2 px-3">
              BACK
            </button>
          </Link>
        </div>
      </div>
      {listOfDeliveryPersons.length === 0 ? (
        <p align="center">No Delivery Persons</p>
      ) : (
        <table className="table">
          <thead>
            <tr scope="row">
              <th scope="col">Delivery Person ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Phone No </th>
              <th scope="col">Address </th>
              <th scope="col">Restaurant ID </th>
            </tr>
          </thead>
          <tbody>
            {listOfDeliveryPersons.map((deliveryPersons) => (
              <tr>
                <th>{deliveryPersons.deliveryPersonId}</th>
                <td>{deliveryPersons.firstName}</td>
                <td>{deliveryPersons.lastName}</td>
                <td>{deliveryPersons.emailId}</td>
                <td>{deliveryPersons.phoneNumber}</td>
                <td>
                  {deliveryPersons.street}, {deliveryPersons.city},{" "}
                  {deliveryPersons.pinCode}
                </td>
                <td>{deliveryPersons.restaurantId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ----------------------------------------------------------------Customers-------------------------------------------------------------------

export const ViewAllCustomers = (props) => {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const resultUser = await fetch("http://localhost:8080/users");
      const jsonObj = await resultUser.json();
      // console.log(jsonObj);
      setListOfUsers(jsonObj);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  return (
    <>
      <div className="container border rounded my-5 py-5 shadow text-center ">
        <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
          ALL CUSTOMERS
          <div className="float-end fs-4  text-light my-3">
            <Link to="/admin/home" className="btn btn-outline-light mx-2 px-3">
                BACK
            </Link>
          </div>
        </div>
        {listOfUsers.length === 0 ? (
          <p align="center">No User</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Customer ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email Id</th>
                <th scope="col">Phone No </th>
                <th scope="col">Address </th>
              </tr>
            </thead>
            <tbody>
              {listOfUsers.map((user) => (
                <tr key={user.id}>
                  <th>{user.userId}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.emailId}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    {user.street},{user.city},{user.pinCode}
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

export const ViewAllCustomerOrders = () => {
  return (
    <div className="container border rounded my-5 py-5 shadow text-center ">
      <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
        ALL ORDERS
        <div className="float-end fs-4  text-light my-3">
          <Link to="/admin/home" className="btn btn-outline-light mx-2 px-3">
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
            <th scope="col">Customer </th>
            <th scope="col">Order Time </th>
            <th scope="col">Order Status </th>
            <th scope="col">Delivery Person </th>
            <th scope="col">Delivery Contact </th>
            <th scope="col">Delivery Time </th>
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
            <td>10/20/20 evening</td>
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
            <td>10/20/20 evening</td>
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
            <td>10/20/20 evening</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// -----------------------------------------------------------------Admin register--------------------------------------------------------------

export const AdminRegister = () => {
  let navigate = useNavigate();

  const [admin, setAdmin] = useState({
    emailId: "",
    password: "",
  });

  const { emailId, password } = admin;

  const onInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/adminregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });

      if (response.ok) {
        console.log("Admin registered successfully");
        navigate("/admin/home");
      } else {
        console.error("Failed to register admin:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering admin:", error.message);
    }
  };
  return (
    <div className="container border rounded my-5 py-5 shadow text-center " style={{ height: 'auto', width: '450px' }}>
      <form className="px-5" onSubmit={(e) => onSubmit(e)}>
        <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
          ADMIN REGISTER
        </div>
        <div className="mb-3">
          <label for="emailId" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailId"
            placeholder="Enter Your Email_Id"
            name="emailId"
            value={emailId}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label for="pswd" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            id="pswd"
            name="password"
            value={password}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="lg-rg mx-2 mt-5">
          <input
            type="submit"
            value="REGISTER"
            className="btn btn-primary mx-2 px-3"
          />
          <Link to="/admin/home" className="btn btn-danger mx-2" size="3">BACK</Link>
        </div>
      </form>
    </div>
  );
};
