import React from "react";

import {
  useSelector,
  useDispatch
} from "react-redux";

import {
  removeFromCart,
  increaseQty,
  decreaseQty
}
from "../../redux/features/cartSlice";

import "./CartPage.scss";

function CartPage() {

  const dispatch: any =
    useDispatch();

  const {
    cartItems
  } = useSelector(
    (state: any) =>
      state.cart
  );

  return (
    <div className="cart-page">

      <h2>
        Shopping Cart
      </h2>

      {cartItems.length === 0 &&
        <p>
          Cart Empty
        </p>
      }

      {
        cartItems.map(
          (item: any) => (

            <div
              className="cart-item"
              key={item._id}
            >

              <img
                src={item.image}
              />

              <div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{item.price}
                </p>

              </div>

              <div>

                <button
                  onClick={() =>
                    dispatch(
                      decreaseQty(
                        item._id
                      )
                    )
                  }
                >
                  -
                </button>

                {item.quantity}

                <button
                  onClick={() =>
                    dispatch(
                      increaseQty(
                        item._id
                      )
                    )
                  }
                >
                  +
                </button>

              </div>

              <button
                onClick={() =>
                  dispatch(
                    removeFromCart(
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

export default CartPage;