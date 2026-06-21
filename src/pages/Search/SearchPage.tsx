import React, {
  useEffect
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchProducts
} from "../../redux/features/productThunk";

import {
  fetchCategories
} from "../../redux/features/categorySlice";

import {
  addProductToCart
} from "../../redux/features/cartThunk";

import {
  addProductToWishlist
} from "../../redux/features/wishlistThunk";

import {
  DEFAULT_PRODUCT_IMAGE
} from "../../constants/images";

import {
  toast
} from "react-toastify";

import Loader from "../../components/loader/Loader";

import { Link } from "react-router-dom";

import "../../styles/_product-grid.scss";

function SearchPage() {

  const API_URL =
    "http://localhost:3500";

  const dispatch: any =
    useDispatch();

  /*
  REDUX STATE
  */

  const {
    products,
    loading,
    searchTerm
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
  FETCH DATA
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
  SEARCH FILTER
  */

  const filteredProducts =
    products.filter(
      (product: any) =>

        product.name
        ?.toLowerCase()
        .includes(
          searchTerm
          ?.toLowerCase()
        )
    );

  /*
  ADD TO CART
  */

  const handleAddCart =
    async (
      product: any
    ) => {

      try {

        await dispatch(
          addProductToCart({
            productId:
              product._id,
            quantity: 1
          })
        ).unwrap();

        toast.success(
          "Added to cart!"
        );

      } catch {

        toast.error(
          "Failed to add cart"
        );
      }
    };

  /*
  WISHLIST
  */

  const handleWishlist =
    async (
      product: any
    ) => {

      try {

        await dispatch(
          addProductToWishlist({
            productId:
              product._id
          })
        ).unwrap();

        toast.success(
          "Added to wishlist"
        );

      } catch {

        toast.error(
          "Failed to add wishlist"
        );
      }
    };

  /*
  LOADING
  */

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="shop-page">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <h3>
          Categories
        </h3>

        <ul>

          <li>

            <Link to="/shop">
              All Products
            </Link>

          </li>

          {categories?.map(
            (
              category: any
            ) => (

            <li
              key={category._id}
            >

              <Link
                to={`/category/${category.slug}`}
              >
                {category.name}
              </Link>

            </li>
          ))}

        </ul>

      </aside>

      {/* SEARCH RESULTS */}

      <div className="shop-content">

        <h2
          style={{
            marginBottom:
              "30px"
          }}
        >
          Search Results for:
          {" "}
          "{searchTerm}"
        </h2>

        {
          filteredProducts.length === 0 ?

          <h3>
            No products found
          </h3>

          :

        <div className="product-grid">

        {
          filteredProducts?.map(
            (
              product: any
            ) => (

            <div
              className="product-card"
              key={
                product._id
              }
            >

              <Link
                to={`/products/${product._id}`}
              >

                <img
                  src={
                    product.image
                    ? `${API_URL}${product.image}`
                    : DEFAULT_PRODUCT_IMAGE
                  }

                  alt={
                    product.name
                  }

                  onError={(
                    e: any
                  ) => {
                    e.target.src =
                      DEFAULT_PRODUCT_IMAGE;
                  }}
                />

              </Link>

              <span>
                {
                  product
                  ?.category
                  ?.name
                }
              </span>

              <Link
                to={`/products/${product._id}`}
              >
                <h3>
                  {product.name}
                </h3>
              </Link>

              <p>
                ₹
                {product.price}
              </p>

              <div className="buttons">

                <button
                  onClick={() =>
                    handleAddCart(
                      product
                    )
                  }
                >
                  Add To Cart
                </button>

                {/*
                <button
                  onClick={() =>
                    handleWishlist(
                      product
                    )
                  }
                >
                  ❤️
                </button>
                */}

              </div>

            </div>
          ))
        }

        </div>
        }

      </div>

    </div>
  );
}

export default SearchPage;