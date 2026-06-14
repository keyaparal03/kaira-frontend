import React from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  removeCartItem
} from "../../redux/features/cartThunk";

import {
  DEFAULT_PRODUCT_IMAGE
} from "../../constants/images";

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

  /*
  -----------------------
  TOTAL
  -----------------------
  */

  const total =
    cartItems.reduce(
      (
        acc: number,
        item: any
      ) => {

        return (
          acc +
          item.quantity *
          item.product.price
        );

      },

      0
    );

  return (
    <div className="cart-page">

      <h2>
        Shopping Cart
      </h2>

      {
        cartItems.length === 0 &&
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
                src={
                  item.product
                    ?.image ||
                  DEFAULT_PRODUCT_IMAGE
                }

                onError={(
                  e: any
                ) => {
                  e.target.src =
                    DEFAULT_PRODUCT_IMAGE;
                }}
              />

              <div>

                <h3>
                  {
                    item.product
                      ?.name
                  }
                </h3>

                <p>
                  ₹
                  {
                    item.product
                      ?.price
                  }
                </p>

                <p>
                  Qty:
                  {
                    item.quantity
                  }
                </p>

              </div>

              <button
                onClick={() =>
                  dispatch(
                    removeCartItem(
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

      <h3>
        Total: ₹{total}
      </h3>

    </div>
  );
}

export default CartPage;