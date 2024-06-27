import React, { useEffect, useState } from "react";
import { CategorySlideShimmer, RestaurantCardShimmer } from "../ShimmerEffect/ShimmerEffect";
import { Link } from "react-router-dom";
import RestaurantCards from "../Body/RestaurantCards";



// -----------------------------------------------------------------------Carousel-------------------------------------------------------------

export const Carousel = () => {

    return(
    <div className="body my-3">
        <div className="container shadow bg-light py-2 my-5">
             <div className="Carousel">
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                     <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"
                        aria-current="true" aria-label="Slide 1"></button>
                     <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                 </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="https://4kwallpapers.com/images/wallpapers/welcome-neon-glow-dark-background-glowing-1920x1080-2068.jpg" className="d-block w-100" alt="image-1" height="500" width="400"/>
                     </div>
                     {/* <div className="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNpVO_f3FxpzSPOjWGAyJ2DAxwmih778g1Yw&s" className="d-block w-100" alt="image-3" height="500" width="200"/>
                    </div> */}
                     <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://10619-2.s.cdn12.com/rests/original/101_518460517.jpg" className="d-block w-100" alt="image-2" height="500" width="400"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
          </div>
        </div>
    </div>
    )
}

// ---------------------------------------------------------------------Category Slide-------------------------------------------------------------

export const CategorySlide = () => {

    const [listOfCategories, setListOfCategories] = useState([]);

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
        console.error("Error loading users:", error);
      }
    };
    return (
      <>
        <hr className="border border-primary border-1 opacity-75 mx-5 mt-3" />
        <div className="category-slide-container">
          <div className="contain d-flex mx-3">
            {listOfCategories.length === 0 ? (
              <p><CategorySlideShimmer/></p>
            ) : (
              <>
                {listOfCategories.map((category) => (
                  <div
                    className="card text-center border border-0 px-2"
                    style={{ width: "18rem " }}
                    key={category.categoryId}
                  >
                    <img
                      src={category.categoryImg}
                      className="card-img-top categoryimg"
                      alt="..."
                      height="200px"
                      width="180px"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{category.name}</h5>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* <hr className="border border-primary border-1 opacity-75 mx-5 mt-3" /> */}
      </>
    );
  };

// -----------------------------------------------------------------------Search Box-------------------------------------------------------------

export const SearchBox = () => {
  const [listOfFoods, setListOfFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/viewallfoods");
      if (!response.ok) {
        throw new Error("Failed to fetch foods");
      }
      const data = await response.json();
      setListOfFoods(data);
      setFilteredFoods(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = listOfFoods.filter((food) =>
      food.name.toLowerCase().includes(searchText.toLowerCase()) 
    // || food.restaurantName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredFoods(filtered);
  };

  return (
    <>
      <div className="container search-bar mt-5">
        <form
          className="d-flex"
          style={{ justifyContent: "center", textAlign: "center" }}
          onSubmit={handleSearch}
        >
          <input
            className="form-control me-2 px-5 shadow"
            type="search"
            placeholder="Search by food name"
            aria-label="Search"
            style={{ width: "720px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-primary shadow"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <hr className="border border-dark border-1 opacity-75 mx-5 mt-4" />
      <div>
        {filteredFoods.map((food) => (
          <RestaurantCards key={food.foodId} food={food} />
        ))}
      </div>
    </>
  );
};
