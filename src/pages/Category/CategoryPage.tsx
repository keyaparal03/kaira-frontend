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
  DEFAULT_PRODUCT_IMAGE
} from "../../constants/images";

import {
  toast
} from "react-toastify";

import Loader from "../../components/loader/Loader";

import {
  Link,
  useParams
} from "react-router-dom";

import "../../styles/_product-grid.scss";

function CategoryPage() {

  const API_URL =
    "http://localhost:3500";

  const dispatch: any =
    useDispatch();

  /*
  URL PARAM
  */

  const {
    categoryName
  } = useParams();

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
  FILTER PRODUCTS
  */

  const filteredProducts =
    products.filter(
      (product: any) => {

        const categoryMatch =

          product?.category?.slug
          ?.toLowerCase()
          .trim() ===

          categoryName
          ?.toLowerCase()
          .trim();

        const searchMatch =

          product.name
          .toLowerCase()
          .includes(
            searchTerm
            .toLowerCase()
          );

        return (
          categoryMatch &&
          searchMatch
        );
      }
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
  LOADER
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
              key={
                category._id
              }
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

      {/* CONTENT */}

      <div className="shop-content">

        <h2
          style={{
            marginBottom:
              "30px"
          }}
        >

          Category:
          {" "}
          {categoryName}

        </h2>

        {
          filteredProducts.length === 0 ?

          <h3>
            No products found
          </h3>

          :

        <div className="product-grid">

        {
          filteredProducts.map(
            (
              product: any
            ) => (

            <div
              className="product-card"
              key={
                product._id
              }
            >

              {/* IMAGE */}

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

              {/* CATEGORY */}

              <span>

                {
                  product
                  ?.category
                  ?.name
                }

              </span>

              {/* NAME */}

              <Link
                to={`/products/${product._id}`}
              >

                <h3>
                  {product.name}
                </h3>

              </Link>

              {/* PRICE */}

              <p>

                ₹
                {product.price}

              </p>

              {/* BUTTON */}

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

export default CategoryPage;