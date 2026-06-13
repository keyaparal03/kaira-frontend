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
  DEFAULT_PRODUCT_IMAGE
} from "../../constants/images";

import "./ShopPage.scss";

function ShopPage() {
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
    dispatch(
      fetchProducts()
    );
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
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

          {products?.map(
            (
              product: any
            ) => (
              <div
                className="product-card"
                key={
                  product._id
                }
              >

                {/* FALLBACK IMAGE */}

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

                <span>
                  {
                    product
                      .category
                      ?.name
                  }
                </span>

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

                <div className="buttons">

                  <button>
                    Add To Cart
                  </button>

                  <Link
                    to={`/products/${product._id}`}
                  >
                    <button className="details-btn">
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

export default ShopPage;