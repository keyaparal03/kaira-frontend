import React from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  Link
} from "react-router-dom";

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
    cartItems,
    loading
  } = useSelector(
    (state: any) =>
      state.cart
  );

  /*
  --------------------
  TOTAL
  --------------------
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
  --------------------
  INCREASE
  MAX 10
  --------------------
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
  --------------------
  DECREASE
  REMOVE IF 1
  --------------------
  */

  const decreaseQty =
    (item: any) => {

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

      dispatch(
        updateCartItem({

          cartItemId:
            item._id,

          quantity:
            item.quantity - 1

        })
      );
    };

  /*
  --------------------
  REMOVE BUTTON
  --------------------
  */

  const removeItem =
    (id: string) => {

      dispatch(
        removeCartItem(id)
      );

      toast.success(
        "Item Removed"
      );
    };

  return (

    <div className="cart-page">

      <div className="cart-container">

        <h2>
          Shopping Cart
        </h2>

        {
          loading &&
          <p>
            Loading...
          </p>
        }

        {
          !loading &&
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
                    item.product?.image ||
                    DEFAULT_IMAGE
                  }

                  alt={
                    item.product?.name
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
                      item.product?.name
                    }
                  </h3>

                  <p>
                    ₹
                    {
                      item.product?.price
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

        {/* TOTAL */}

        {
          cartItems.length > 0 &&

          <div className="cart-total">

            <h3>
              Total: ₹{total}
            </h3>

            <Link
              to="/checkout"
            >

              <button>
                Checkout
              </button>

            </Link>

          </div>
        }

      </div>

    </div>
  );
}

export default CartPage;