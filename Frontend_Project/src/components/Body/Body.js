import React, { useEffect, useState } from "react";
import { CategorySlide, Carousel, SearchBox } from "../Home/HomePage";
import Footer from "../Footer/Footer";

  
const Body = () => {
  return (
    <>
      <Carousel />
      <CategorySlide />
      <SearchBox />
      <Footer/>
    </>
  );
};

export default Body;
