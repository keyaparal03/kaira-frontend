import React, {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchProductById
} from "../../redux/features/productThunk";

import {
  addProductToCart
} from "../../redux/features/cartThunk";

import {
  addProductToWishlist
} from "../../redux/features/wishlistThunk";

import {
  toast
} from "react-toastify";

import "./ProductDetails.scss";

const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg";

function ProductDetails() {

  const { id } =
    useParams();

  const dispatch: any =
    useDispatch();

  const [quantity, setQuantity] =
    useState(1);

  const [selectedSize, setSelectedSize] =
    useState("M");

  const {
    product,
    loading
  } = useSelector(
    (state: any) =>
      state.product
  );

  /*
  -----------------------------
  FETCH PRODUCT
  -----------------------------
  */

  useEffect(() => {

    if (id) {

      dispatch(
        fetchProductById(
          id
        )
      );
    }

  }, [id, dispatch]);

  /*
  -----------------------------
  QUANTITY
  -----------------------------
  */

  const increaseQty =
    () => {

      setQuantity(
        quantity + 1
      );
    };

  const decreaseQty =
    () => {

      if (quantity > 1) {

        setQuantity(
          quantity - 1
        );
      }
    };

  /*
  -----------------------------
  ADD TO CART
  -----------------------------
  */

  const handleAddCart =
    async () => {

      try {

        await dispatch(

          addProductToCart({

            productId:
              product._id,

            quantity

          })

        ).unwrap();

        toast.success(
          "Added to cart 🛒"
        );

      } catch (
        error: any
      ) {

        toast.error(
          error ||
          "Failed to add cart"
        );
      }
    };

  /*
  -----------------------------
  ADD TO WISHLIST
  -----------------------------
  */

  const handleWishlist =
    async () => {

      try {

        await dispatch(

          addProductToWishlist({

            productId:
              product._id

          })

        ).unwrap();

        toast.success(
          "Added to wishlist ❤️"
        );

      } catch (
        error: any
      ) {

        toast.error(
          error ||
          "Failed to add wishlist"
        );
      }
    };

  /*
  -----------------------------
  LOADING
  -----------------------------
  */

  if (loading) {

    return (
      <div className="loading">
        Loading Product...
      </div>
    );
  }

  /*
  -----------------------------
  NOT FOUND
  -----------------------------
  */

  if (!product) {

    return (
      <div className="loading">
        Product Not Found
      </div>
    );
  }

  return (

    <section className="product-details">

      <div className="product-wrapper">

        {/* IMAGE */}

        <div className="product-gallery">

          <img
            src={
              product.image ||
              DEFAULT_IMAGE
            }

            alt={
              product.name
            }

            onError={(
              e: any
            ) => {

              e.target.src =
                DEFAULT_IMAGE;
            }}
          />

        </div>

        {/* CONTENT */}

        <div className="product-content">

          <span className="category-badge">

            {
              product
                ?.category
                ?.name
            }

          </span>

          <h1>
            {product.name}
          </h1>

          <div className="rating">

            ⭐⭐⭐⭐☆

            <span>
              (4.2 Reviews)
            </span>

          </div>

          <h2 className="price">
            ₹{product.price}
          </h2>

          <p className="description">
            {product.description}
          </p>

          {/* FEATURES */}

          <div className="features">

            <p>
              ✓ Premium Quality
            </p>

            <p>
              ✓ Free Shipping
            </p>

            <p>
              ✓ 7 Days Return
            </p>

            <p>
              ✓ Secure Payment
            </p>

          </div>

          {/* META */}

          <div className="meta">

            <p>
              <strong>
                Brand:
              </strong>{" "}
              {product.brand}
            </p>

            <p>
              <strong>
                Stock:
              </strong>{" "}
              {product.stock}
            </p>

          </div>

          {/* SIZE */}

          <div className="sizes">

            <h4>
              Select Size
            </h4>

            <div className="size-list">

              {[
                "S",
                "M",
                "L",
                "XL"
              ].map(
                (size) => (

                  <button
                    key={size}

                    className={
                      selectedSize ===
                      size
                        ? "active"
                        : ""
                    }

                    onClick={() =>
                      setSelectedSize(
                        size
                      )
                    }
                  >
                    {size}
                  </button>
                )
              )}

            </div>

          </div>

          {/* QUANTITY */}

          <div className="quantity">

            <button
              onClick={
                decreaseQty
              }
            >
              -
            </button>

            <span>
              {quantity}
            </span>

            <button
              onClick={
                increaseQty
              }
            >
              +
            </button>

          </div>

          {/* ACTIONS */}

          <div className="actions">

            <button
              className="cart-btn"

              onClick={
                handleAddCart
              }
            >
              Add To Cart
            </button>

            <button
              className="buy-btn"

              onClick={
                handleWishlist
              }
            >
              ❤️ Wishlist
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;