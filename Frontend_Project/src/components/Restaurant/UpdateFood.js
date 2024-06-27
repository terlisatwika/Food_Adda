import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Body/UserContext";

const UpdateFood = () => {

  let navigate = useNavigate();
  
  const {user} = useUser();

  const { id } = useParams();

  const [listOfCategories, setListOfCategories] = useState([]);
  const [food, setFood] = useState({
    name: "",
    description: "",
    price: "",
    categoryName: "",
    restaurantId: user ? user.restaurantId : "",
    foodImgUrl: "",
    foodImgUrl2: "",
    foodImgUrl3: "",
  });

  const [loading, setLoading] = useState(true);

  const {
    name,
    description,
    price,
    categoryName,
    foodImgUrl,
    foodImgUrl2,
    foodImgUrl3,
  } = food;

  const onInputChange = (e) => {
    // console.log("Input change:", e.target.value);
    // setCategory({ ...category, [e.target.name]: e.target.value });
    const { name, value } = e.target;

    // If the input is a select element, set the value directly
    if (e.target.tagName === "SELECT") {
      setFood({ ...food, [name]: value });
    } else {
      setFood({ ...food, [name]: value });
    }
  };

  useEffect(() => {
    const loadfoods = async () => {
      try {
        const result = await fetch(`http://localhost:8080/viewfoodbyid/${id}`);
        const jsonObj = await result.json();
        setFood(jsonObj);
        setLoading(false);
      } catch (error) {
        console.error("Error loading food:", error);
      }
    };
    loadfoods();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with food:", food);
    try {
      const response = await fetch(`http://localhost:8080/updatefood/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(food),
      });

      if (response.ok) {
        console.log("Food updated successfully");
        navigate("/restaurant/viewmyfoods");
      } else {
        console.error("Failed to update food:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating food:", error.message);
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

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div className="container my-5 shadow border rounded text-center">
        <div className="container header fs-2 text-center my-5 mb-1 bg-primary text-light rounded-top py-3">
          UPDATE FOOD DETAILS
          <div className="float-end fs-4  text-light ">
            <Link
              to="/restaurant/viewmyfoods"
              className="btn btn-outline-light mx-2 px-3 ">
                BACK
            </Link>
          </div>
        </div>
        <div className="row ">
          <div className="col">
            <div className="container shadow bg-light py-2 my-5">
              <div className="Carousel">
                <div
                  id="carouselExampleDark"
                  className="carousel carousel-dark slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div
                      className="carousel-item active"
                      data-bs-interval="10000"
                    >
                      <img
                        name="foodImgUrl"
                        src={foodImgUrl}
                        className="d-block w-100"
                        alt="..."
                        height="200px"
                        width="100px"
                      />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img
                        name="foodImgUrl2"
                        src={foodImgUrl2}
                        className="d-block w-100"
                        alt="..."
                        height="200px"
                        width="100px"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        name="foodImgUrl3"
                        src={foodImgUrl3}
                        className="d-block w-100"
                        alt="..."
                        height="200px"
                        width="100px"
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container border rounded mx-2 my-5 py-5 px-1 shadow text-center col">
            <form className="px-5" onSubmit={(e) => onSubmit(e)}>
              <div className="header fs-2 text-center mb-5 bg-primary text-light rounded-top">
                UPDATE DETAILS
              </div>
              <div className="">
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
              <div className="">
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
              <div className="lg-rg mx-2 mt-5">
                <button type="submit" className="btn btn-primary mx-2 px-5">
                  UPDATE
                </button>
              </div>
            </form>
          </div>

          <div className="container border rounded my-5 mx-2 py-5 shadow text-center col">
            <form className="px-2 " onSubmit={(e) => onSubmit(e)}>
              <div className="header fs-2 text-center mb-5 bg-primary text-light rounded-top">
                UPDATE IMAGES
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Image URl"
                  name="foodImgUrl"
                  value={foodImgUrl}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Image URl"
                  name="foodImgUrl2"
                  value={foodImgUrl2}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Image URl"
                  name="foodImgUrl3"
                  value={foodImgUrl3}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="lg-rg mx-2 mt-5">
                <button type="submit" className="btn btn-primary mx-2 px-5">
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateFood;
