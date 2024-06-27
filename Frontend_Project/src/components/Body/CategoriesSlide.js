import React, { useEffect, useState } from "react";
import { CategorySlideShimmer } from "../ShimmerEffect/ShimmerEffect";

const CategorySlide = () => {
  const [listOfCategories, setListOfCategories] = useState([]);

  //   const { id } = useParams();

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
                  key={category.categoryId}>
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
      {/* s<hr className="border border-primary border-1 opacity-75 mx-5 mt-3" /> */}
    </>
  );
};
export default CategorySlide;
