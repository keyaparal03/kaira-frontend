import React from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  removeCartItem,
  updateCartItem
} from "../../redux/features/cartThunk";

import {
  toast
} from "react-toastify";

import "./CartPage.scss";

const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg";

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
  TOTAL
  */

  const total =
    cartItems.reduce(
      (
        acc: number,
        item: any
      ) =>
        acc +
        (
          item.product?.price || 0
        ) *
        item.quantity,

      0
    );

  /*
  INCREASE
  MAX = 10
  */

  const increaseQty =
    (item: any) => {

      if (
        item.quantity >= 10
      ) {

        toast.error(
          "Maximum quantity is 10"
        );

        return;
      }

      dispatch(
        updateCartItem({

          cartItemId:
            item._id,

          quantity:
            item.quantity + 1

        })
      );
    };

  /*
  DECREASE
  REMOVE IF 1
  */

  const decreaseQty =
    (item: any) => {

      /*
      REMOVE ITEM
      */

      if (
        item.quantity === 1
      ) {

        dispatch(
          removeCartItem(
            item._id
          )
        );

        toast.success(
          "Item Removed"
        );

        return;
      }

      /*
      DECREASE
      */

      dispatch(
        updateCartItem({

          cartItemId:
            item._id,

          quantity:
            item.quantity - 1

        })
      );
    };

  return (

    <div className="cart-page">

      <div className="cart-container">

        <h2>
          Shopping Cart
        </h2>

        {
          cartItems.length === 0 &&

          <p>
            Cart is Empty
          </p>
        }

        {
          cartItems.map(
            (item: any) => (

              <div
                className="cart-card"
                key={item._id}
              >

                {/* IMAGE */}

                <img
                  src={
                    item.product
                      ?.image ||
                    DEFAULT_IMAGE
                  }

                  alt={
                    item.product
                      ?.name
                  }

                  onError={(
                    e: any
                  ) => {

                    e.target.src =
                      DEFAULT_IMAGE;
                  }}
                />

                {/* INFO */}

                <div className="cart-info">

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

                </div>

                {/* QUANTITY */}

                <div className="qty-box">

                  <button
                    onClick={() =>
                      decreaseQty(
                        item
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {
                      item.quantity
                    }
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(
                        item
                      )
                    }
                  >
                    +
                  </button>

                </div>

                {/* REMOVE */}

                <button
                  className="remove-btn"

                  onClick={() => {

                    dispatch(
                      removeCartItem(
                        item._id
                      )
                    );

                    toast.success(
                      "Item Removed"
                    );
                  }}
                >
                  Remove
                </button>

              </div>
            )
          )
        }

        {/* TOTAL */}

        <div className="cart-total">

          <h3>
            Total: ₹{total}
          </h3>

          <button>
            Checkout
          </button>

        </div>

      </div>

    </div>
  );
}

export default CartPage;