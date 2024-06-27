import React from "react";

export const ShimmerEffect = () => {
  return (
    <>
      <div className="body my-3">
        <div className="container shadow bg-light py-2 my-5">
          <div className="Carousel" aria-hidden="true">
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
                <div className="carousel-item active" data-bs-interval="10000">
                  <img
                    src="..."
                    className="d-block w-100 placeholder"
                    alt="..."
                    height="500"
                    width="400"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>
                      <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                      <span class="placeholder col-7"></span>
                    </p>
                  </div>
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
    </>
  );
};

{
  /* ---------------------------------------------------------------------------- */
}
export const CategorySlideShimmer = () => {
  return (
    <>
      {/* <hr className="border border-primary border-1 opacity-75 mx-5 mt-3 placeholder col-12" aria-hidden="true"/> */}
      <div className="category-slide-container" aria-hidden="true">
        <div className="contain d-flex mx-3" aria-hidden="true">
          <div
            className="card text-center border border-0 px-2"
            style={{ width: "18rem " }}
          >
            <img
              src=".."
              className="card-img-top categoryimg placeholder "
              alt="..."
              height="200px"
              width="180px"
            />
            <div className="card-body">
              <h5 className="card-title">
                <span class="placeholder col-5"></span>
              </h5>
            </div>
          </div>
          <div
            className="card border border-0 text-center"
            style={{ width: "18rem " }}
          >
            <img
              src=""
              className="card-img-top categoryimg placeholder"
              alt="..."
              height="200px"
              width="200px"
            />
            <div className="card-body">
              <h5 className="card-title">
                <span class="placeholder col-5"></span>
              </h5>
            </div>
          </div>
          <div
            className="card text-center border border-0 px-2"
            style={{ width: "18rem " }}
          >
            <img
              src=""
              className="card-img-top categoryimg placeholder"
              alt="..."
              height="200px"
              width="180px"
            />
            <div className="card-body">
              <h5 className="card-title">
                <span class="placeholder col-5"></span>
              </h5>
            </div>
          </div>
          <div
            className="card border border-0 text-center"
            style={{ width: "18rem " }}
          >
            <img
              src=""
              className="card-img-top categoryimg placeholder"
              alt="..."
              height="200px"
              width="20px"
            />
            <div className="card-body">
              <h5 className="card-title">
                <span class="placeholder col-5"></span>
              </h5>
            </div>
          </div>
          <div
            className="card text-center border border-0 px-2"
            style={{ width: "18rem " }}
          >
            <img
              src=""
              className="card-img-top categoryimg placeholder"
              alt="..."
              height="200px"
              width="180px"
            />
            <div className="card-body">
              <h5 className="card-title">
                <span class="placeholder col-5"></span>
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* <hr className="border border-primary border-1 opacity-75 mx-5 mt-3  placeholder col-12" aria-hidden="true"/> */}
    </>
  );
};

export const RestaurantCardShimmer = () => {
  return (
    <div className="cards my-5 mx-5" aria-hidden="true">
      <div className="card shadow mx-2" style={{ width: "20rem " }}>
        <img src="" className="card-img-top placeholder p-5" alt="..." />
        <div className="card-body placeholder-glow">
          <h5 className="card-title">
            <span class="placeholder col-5"></span>
          </h5>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-7"></span>
          </p>
          <a
            href="#"
            className="btn btn-primary disabled placeholder col-8"
          ></a>
        </div>
      </div>
      <div className="card shadow mx-2" style={{ width: "20rem " }}>
        <img src="" className="card-img-top placeholder p-5" alt="..." />
        <div className="card-body placeholder-glow">
          <h5 className="card-title">
            <span class="placeholder col-5"></span>
          </h5>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-7"></span>
          </p>
          <a
            href="#"
            className="btn btn-primary disabled placeholder col-8"
          ></a>
        </div>
      </div>
      <div className="card shadow mx-2" style={{ width: "20rem " }}>
        <img src="" className="card-img-top placeholder p-5" alt="..." />
        <div className="card-body placeholder-glow">
          <h5 className="card-title">
            <span class="placeholder col-5"></span>
          </h5>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-7"></span>
          </p>
          <a
            href="#"
            className="btn btn-primary disabled placeholder col-8"
          ></a>
        </div>
      </div>
      <div className="card shadow mx-2" style={{ width: "20rem " }}>
        <img src="" className="card-img-top placeholder p-5" alt="..." />
        <div className="card-body placeholder-glow">
          <h5 className="card-title">
            <span class="placeholder col-5"></span>
          </h5>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-7"></span>
          </p>
          <a
            href="#"
            className="btn btn-primary disabled placeholder col-8"
          ></a>
        </div>
      </div>
      <div className="card shadow mx-2" style={{ width: "20rem " }}>
        <img src="" className="card-img-top placeholder p-5" alt="..." />
        <div className="card-body placeholder-glow">
          <h5 className="card-title">
            <span class="placeholder col-5"></span>
          </h5>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-7"></span>
          </p>
          <a
            href="#"
            className="btn btn-primary disabled placeholder col-8"
          ></a>
        </div>
      </div>
      <div className="card shadow mx-2" style={{ width: "16rem " }}>
        <img src="" className="card-img-top placeholder p-5" alt="..." />
        <div className="card-body placeholder-glow">
          <h5 className="card-title">
            <span class="placeholder col-5"></span>
          </h5>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-5"></span>
          </p>
          <p className="card-text">
            <span class="placeholder col-7"></span>
          </p>
          <a
            href="#"
            className="btn btn-primary disabled placeholder col-8"
          ></a>
        </div>
      </div>
    </div>
  );
};
