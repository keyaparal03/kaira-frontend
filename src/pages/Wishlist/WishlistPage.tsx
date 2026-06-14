import React from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  removeProductFromWishlist
} from "../../redux/features/wishlistThunk";

import "./WishlistPage.scss";

function WishlistPage() {

  const dispatch: any =
    useDispatch();

  const {
    wishlistItems
  } = useSelector(
    (state: any) =>
      state.wishlist
  );

  return (
    <div className="wishlist-page">

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
              className="wishlist-item"
            >

              <img
                src={item.image}
                alt=""
                width="120"
              />

              <div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{item.price}
                </p>

              </div>

              <button
                onClick={() =>
                  dispatch(
                    removeProductFromWishlist(
                      item._id
                    )
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
  );
}

export default WishlistPage;