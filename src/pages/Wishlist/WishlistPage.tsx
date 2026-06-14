import React from "react";

import {
  useSelector,
  useDispatch
} from "react-redux";

import {
  removeFromWishlist
}
from "../../redux/features/wishlistSlice";

import "./WishlistPage.scss";

function WishlistPage() {

  const dispatch:any =
    useDispatch();

  const {
    wishlistItems
  } = useSelector(
    (state:any)=>
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
          Wishlist Empty
        </p>
      }

      {
        wishlistItems.map(
          (item:any)=>(
            <div
              className="wishlist-item"
              key={item._id}
            >

              <img
                src={item.image}
              />

              <h3>
                {item.name}
              </h3>

              <p>
                ₹{item.price}
              </p>

              <button
                onClick={()=>
                  dispatch(
                    removeFromWishlist(
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