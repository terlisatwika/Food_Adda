import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Body/UserContext";

const AddFood = () => {
  let navigate = useNavigate();
  const { userData } = useUser(); // Destructure userData from useUser hook

  const [listOfCategories, setListOfCategories] = useState([]);
  const [food, setFood] = useState({
    name: "",
    description: "",
    price: "",
    categoryName: "",
    restaurantId: userData ? userData.restaurantId : "",
    foodImgUrl: "",
    foodImgUrl2: "",
    foodImgUrl3: "",
  });

  const { name, description, price, categoryName, foodImgUrl, foodImgUrl2, foodImgUrl3 } = food;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/addfood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(food)
      });

      if (response.ok) {
        console.log("Food added successfully");
        navigate("/restaurant/viewmyfoods");
      } else {
        console.error("Failed to add food:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding food:", error.message);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await fetch("http://localhost:8080/viewcategories");
      const jsonObj = await result.json();
      setListOfCategories(jsonObj);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  return (
    <div className="container border rounded my-5 py-5 shadow text-center ">
      <form className="px-5" onSubmit={(e) => onSubmit(e)}>
        <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
          ADD FOOD
        </div>
        <div className="row">
          <div className="mb-3 col">
            <input
              type="text"
              className="form-control"
              id="addfood"
              placeholder="Enter Food Title"
              aria-describedby="textHelp"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-3 col">
            <textarea
              className="form-control"
              id="Textarea"
              rows="3"
              placeholder="Enter Food Description..."
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col">
            <select
              className="form-select form-select-md mb-3"
              aria-label="Large select example"
              name="categoryName"
              value={categoryName}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="">Select Category</option>
              {listOfCategories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 col">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Food Price"
              aria-describedby="textHelp"
              name="price"
              value={price}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>
        <div className="row">
          <label className="form-label mb-4 fs-4">Upload Food Images</label>
          <div className="mb-3 col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Image URL"
              name="foodImgUrl"
              value={foodImgUrl}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-3 col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Image URL"
              name="foodImgUrl2"
              value={foodImgUrl2}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Image URL"
              name="foodImgUrl3"
              value={foodImgUrl3}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>
        <div className="lg-rg mx-2 mt-5">
          <button type="submit" className="btn btn-primary mx-2 px-5">
            ADD
          </button>
          <Link to="/restaurant/home" className="btn btn-danger mx-2 px-4">
            BACK
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
