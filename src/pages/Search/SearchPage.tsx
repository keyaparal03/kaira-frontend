import React from "react";

import {
  useSelector
} from "react-redux";

import { Link } from "react-router-dom";

import Loader from "../../components/loader/Loader";

import "../../styles/_product-grid.scss";

function SearchPage() {

  const {
    products,
    loading,
    searchTerm
  } = useSelector(
    (state: any) =>
      state.product
  );

  const filteredProducts =
    products.filter(
      (product: any) =>
        product.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="shop-page">

      <div className="shop-content">

        <h2>
          Search Results
        </h2>

        <div className="product-grid">

          {filteredProducts.map(
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

                <p>
                  ₹{product.price}
                </p>

                <Link
                  to={`/products/${product._id}`}
                >
                  <button>
                    View
                  </button>
                </Link>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default SearchPage;