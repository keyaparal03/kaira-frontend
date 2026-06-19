import React, { useEffect } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { useParams, Link } from "react-router-dom";

import {
  fetchProducts
} from "../../redux/features/productThunk";

import {
  addProductToCart
} from "../../redux/features/cartThunk";

import {
  addProductToWishlist
} from "../../redux/features/wishlistThunk";

import Loader from "../../components/loader/Loader";

import {
  DEFAULT_PRODUCT_IMAGE
} from "../../constants/images";

import { toast } from "react-toastify";

import "../../styles/_product-grid.scss";

function CategoryPage() {

  const { categoryName } =
    useParams();

  const dispatch: any =
    useDispatch();

  const {
    products,
    loading
  } = useSelector(
    (state: any) =>
      state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts =
    products.filter(
      (product: any) =>
        product?.category?.name
          ?.toLowerCase()
          .includes(
            categoryName
              ?.replace("-", " ")
              .toLowerCase()
          )
    );

  const handleAddCart =
    async (product: any) => {
      await dispatch(
        addProductToCart({
          productId: product._id,
          quantity: 1
        })
      );
      toast.success("Added to cart");
    };

  const handleWishlist =
    async (product: any) => {
      await dispatch(
        addProductToWishlist({
          productId: product._id
        })
      );
      toast.success("Added to wishlist");
    };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="shop-page">

      <div className="shop-content">

        <h2>{categoryName}</h2>

        <div className="product-grid">

          {filteredProducts.map(
            (product: any) => (

              <div
                className="product-card"
                key={product._id}
              >

                <img
                  src={
                    product.image ||
                    DEFAULT_PRODUCT_IMAGE
                  }
                  alt={product.name}
                />

                <h3>
                  {product.name}
                </h3>

                <p>
                  ₹{product.price}
                </p>

                <div className="buttons">

                  <button
                    onClick={() =>
                      handleAddCart(product)
                    }
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={() =>
                      handleWishlist(product)
                    }
                  >
                    ❤️
                  </button>

                  <Link
                    to={`/products/${product._id}`}
                  >
                    <button>
                      View
                    </button>
                  </Link>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default CategoryPage;