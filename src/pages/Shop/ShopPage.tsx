import React, {
  useEffect,
  useState
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
} from "../../redux/features/categoryThunk";

import {
  addProductToCart
} from "../../redux/features/cartThunk";

import {
  DEFAULT_PRODUCT_IMAGE
} from "../../constants/images";

import {
  toast
} from "react-toastify";

import "../../styles/_product-grid.scss";

import Loader from "../../components/loader/Loader";

import { Link } from "react-router-dom";

function ShopPage() {

  /*
  API URL
  */

  const API_URL = "http://localhost:3500";

  const dispatch: any =
    useDispatch();

  /*
  STATE
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
  CATEGORY FILTER
  */

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("");

  /*
  LOAD PRODUCTS + CATEGORY
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

        const searchMatch =

          product.name
          .toLowerCase()
          .includes(
            searchTerm
            .toLowerCase()
          );

        const categoryMatch =

          selectedCategory

          ? product.category?._id ===
            selectedCategory

          : true;

        return (
          searchMatch &&
          categoryMatch
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

  {/* ALL PRODUCTS */}

  <li>

    <Link to="/shop">

      All Products

    </Link>

  </li>

  {/* DYNAMIC CATEGORY LINKS */}

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

        {/* <ul>

         

          <li>

            <button
              onClick={() =>
                setSelectedCategory("")
              }
            >
              All Products
            </button>

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

              <button
                onClick={() =>

                  setSelectedCategory(
                    category._id
                  )
                }
              >
                {category.name}

              </button>

            </li>
          ))}

        </ul> */}

      </aside>

      {/* PRODUCTS */}

      <div className="shop-content">

      {
        filteredProducts.length === 0 ?

        <h3>
          No products found
        </h3>

        :

      <div className="product-grid">

      {filteredProducts?.map(

        (
          product: any
        ) => (

        <div
          className="product-card"
          key={product._id}
        >

          {/* PRODUCT IMAGE */}

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

          {/* PRODUCT NAME */}

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
      ))}

      </div>
      }

      </div>

    </div>
  );
}

export default ShopPage;