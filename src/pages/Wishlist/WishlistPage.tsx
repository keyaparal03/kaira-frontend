import React from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  Link
} from "react-router-dom";

import {
  removeProductFromWishlist
} from "../../redux/features/wishlistThunk";

import Loader from "../../components/loader/Loader";

import "./WishlistPage.scss";

const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg";

function WishlistPage() {

  const API_URL =
    "http://localhost:3500";

  const dispatch: any =
    useDispatch();

  const {
    wishlistItems,
    loading
  } = useSelector(
    (state: any) =>
      state.wishlist
  );

  const removeItem =
    (id: string) => {

      dispatch(
        removeProductFromWishlist(
          id
        )
      );
    };

  /*
  LOADING
  */

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="wishlist-page">

      <div className="wishlist-container">

        <h2>
          My Wishlist ❤️
        </h2>

        {
          wishlistItems.length === 0 &&

          <p>
            No Wishlist Items
          </p>
        }

        {
          wishlistItems.map(
            (item: any) => (

              <div
                key={item._id}
                className="wishlist-card"
              >

                {/* IMAGE */}

                <Link
                  to={`/products/${item._id}`}
                >

                  <img
                    src={
                      item.image

                      ? `${API_URL}${item.image}`

                      : DEFAULT_IMAGE
                    }

                    alt={
                      item.name
                    }

                    onError={(
                      e: any
                    ) => {

                      e.target.src =
                        DEFAULT_IMAGE;
                    }}
                  />

                </Link>

                {/* INFO */}

                <div className="wishlist-info">

                  <Link
                    to={`/products/${item._id}`}
                    style={{
                      textDecoration:
                        "none",
                      color: "inherit"
                    }}
                  >

                    <h3>
                      {item.name}
                    </h3>

                  </Link>

                  {/* <p>

                    Category:
                    {" "}

                    {
                      item
                      ?.category
                      ?.name || "N/A"
                    }

                  </p> */}

                  <p>
                    ₹{item.price}
                  </p>

                </div>

                <button
                  className="remove-btn"

                  onClick={() =>
                    removeItem(
                      item._id
                    )
                  }
                >
                  Remove
                </button>

              </div>
            )
          )
        }

      </div>

    </div>
  );
}

export default WishlistPage;