import React, {
  useEffect,
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  Link
} from "react-router-dom";

import {
  fetchProducts
} from "../../redux/features/productThunk";

import {
  fetchCategories
} from "../../redux/features/categoryThunk";

// import slider1 from "../../assets/slider/slider.png";
// import slider3 from "../../assets/slider/slider3.png";
// import slider7 from "../../assets/slider/slider7.png";

import "./HomePage.scss";

const API_URL =
  "http://localhost:3500";

const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg";

function HomePage() {

  const dispatch: any =
    useDispatch();

  const {
    products
  } = useSelector(
    (state: any) =>
      state.product
  );

  const {
    categories
  } = useSelector(
    (state: any) =>
      state.category
  );

  /*
  HERO SLIDER
  */

 const slides = [
  {
    title: "Enhance Style In You",
    subtitle: "From handcrafted jewelry to stunning ethnic and modern fashion, Kaira brings unique styles curated specially for every woman.",
    button: "Shop Now",
    image: "/slider/slider.png"
  },
  {
    title: "Handmade Jewelry Crafted With Love",
    subtitle: "Beautiful handcrafted and oxidised jewelry designed for timeless elegance.",
    button: "Explore Collection",
    image: "/slider/slider4.png"
  },
  {
    title: "Fashion That Defines You",
    subtitle: "Premium women’s wear and statement accessories for every occasion.",
    button: "View Products",
    image: "/slider/slider7.png"
  }
];

  const [currentSlide,
  setCurrentSlide] =
    useState(0);

  /*
  FETCH API
  */

  useEffect(() => {

    dispatch(
      fetchProducts()
    );

    dispatch(
      fetchCategories()
    );

  }, [dispatch]);

  /*
  AUTO HERO SLIDE
  */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentSlide(
          (prev) =>
            (prev + 1)
            %
            slides.length
        );

      }, 4000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  /*
  TOP 4 CATEGORY
  */

  const topCategories =
    categories?.slice(
      0,
      4
    );

  /*
  LATEST 3 PRODUCTS
  */

  const latestProducts =
    products?.slice(
      0,
      3
    );

  return (

    <div className="home-page">

      {/* HERO */}

     <section
        className="hero"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`
        }}
      >

        <div className="overlay"></div>

        <div className="hero-content">

          <h1>
            {
              slides[currentSlide]
                .title
            }
          </h1>

          <p>
            {
              slides[currentSlide]
                .subtitle
            }
          </p>

          <Link to="/shop">
            <button>
              {
                slides[currentSlide]
                  .button
              }
            </button>
          </Link>

        </div>

      </section>

      {/* CATEGORY */}

      <section className="categories">

        <h2>
          Shop By Category
        </h2>

        <div className="category-grid">

          {
            topCategories?.map(
              (
                category: any
              ) => (

                <Link
                  key={
                    category._id
                  }

                  to={`/category/${category.slug}`}
                >

                  <div
                    className="category-card"
                  >

                    {
                      category.name
                    }

                  </div>

                </Link>
              )
            )
          }

        </div>

      </section>

      {/* LATEST PRODUCTS */}

      <section className="products">

        <h2>
          New Arrivals
        </h2>

        <div className="product-grid">

          {
            latestProducts?.map(
              (
                product: any
              ) => (

                <div
                  className="product-card"

                  key={
                    product._id
                  }
                >

                  <img
                    src={
                      product.image

                      ?

                      `${API_URL}${product.image}`

                      :

                      DEFAULT_IMAGE
                    }

                    alt={
                      product.name
                    }
                  />

                  <h3>
                    {
                      product.name
                    }
                  </h3>

                  <p>
                    ₹
                    {
                      product.price
                    }
                  </p>

                  <Link
                    to={`/products/${product._id}`}
                  >

                    <button>
                      View Product
                    </button>

                  </Link>

                </div>
              )
            )
          }

        </div>

      </section>

      {/* PRODUCT SCROLLER */}

      <section className="product-slider">

        <h2>
          Trending Products
        </h2>

        <div className="scroll-wrapper">

          <div className="scroll-track">

            {[...products, ...products].map(
              (product: any, index) => (

                <Link
                  key={index}
                  to={`/products/${product._id}`}
                >

                  <div className="scroll-card">

                    <img
                      src={
                        product.image
                          ? `${API_URL}${product.image}`
                          : DEFAULT_IMAGE
                      }
                      alt={product.name}
                    />

                    <p>{product.name}</p>

                  </div>

                </Link>
              )
            )}

          </div>

        </div>

      </section>

      {/* PROMO */}

      <section className="promo">

        <div className="promo-content">

          <h2>
            Handmade Jewellery Collection
          </h2>

          <p>
            Unique oxidised jewellery crafted specially to enhance your elegance.
          </p>
          <button className="shop-collection">
            <Link to="/shop">
              
              Shop Collection
              
            </Link>
          </button>
          

        </div>

      </section>

    </div>
  );
}

export default HomePage;