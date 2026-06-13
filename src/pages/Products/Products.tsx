import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../../redux/features/productThunk";

import "./Products.scss";

function Products() {
  const dispatch: any = useDispatch();

  const { products, loading } =
    useSelector(
      (state: any) => state.product
    );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="products-page">

      <h1 className="page-title">
        Our Products
      </h1>

      <div className="products-grid">

        {products?.map(
          (product: any) => (
            <div
              className="product-card"
              key={product._id}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>
                {product.name}
              </h3>

              <p className="category">
                {product.category?.name}
              </p>

              <p className="brand">
                Brand :
                {product.brand}
              </p>

              <p className="price">
                ₹ {product.price}
              </p>

              <p className="stock">
                Stock :
                {product.stock}
              </p>

              <div className="buttons">

                <button className="cart-btn">
                  Add To Cart
                </button>

                <Link
                  to={`/products/${product._id}`}
                >
                  <button className="details-btn">
                    View Details
                  </button>
                </Link>

              </div>

            </div>
          )
        )}

      </div>
    </div>
  );
}

export default Products;