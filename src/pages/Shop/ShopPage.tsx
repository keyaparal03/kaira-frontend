import React, {
  useEffect
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { Link }
from "react-router-dom";

import {
  fetchProducts
} from "../../redux/features/productThunk";

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

import "./ShopPage.scss";

import Loader from "../../components/loader/Loader";

function ShopPage() {

  const dispatch: any =
    useDispatch();

  const {
    products,
    loading,
    searchTerm
  } = useSelector(
    (state: any) =>
      state.product
  );

  useEffect(() => {
    dispatch(
      fetchProducts()
    );
  }, [dispatch]);

  /*
  SEARCH FILTER
  */

  const filteredProducts =
    products.filter(
      (product: any) =>

        product.name
        .toLowerCase()
        .includes(
          searchTerm
          .toLowerCase()
        )
    );

  /*
  ADD CART
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
          "Added to cart 🛒"
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

  if (loading) {
    return <Loader />;;
  }

  return (
    <div className="shop-page">

      <aside className="sidebar">

        <h3>
          Categories
        </h3>

        <ul>
          <li>Women</li>
          <li>Sarees</li>
          <li>Beauty</li>
          <li>Accessories</li>
        </ul>

      </aside>

      <div className="shop-content">

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
                      product.image ||
                      DEFAULT_PRODUCT_IMAGE
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

                  <Link to={`/products/${product._id}`}><h3>
                    {
                      product.name
                    }
                  </h3></Link>

                  <p>
                    ₹
                    {
                      product.price
                    }
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

                    {/* <button
                      onClick={() =>
                        handleWishlist(
                          product
                        )
                      }
                    >
                      ❤️
                    </button> */}

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}

export default ShopPage;