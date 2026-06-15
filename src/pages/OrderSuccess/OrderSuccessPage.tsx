import React from "react";

import {
  Link
} from "react-router-dom";

import "./OrderSuccessPage.scss";

function OrderSuccessPage() {

  return (

    <div className="order-success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully
        </h1>

        <p>
          Thank you for shopping with KAIRA.
          Your payment was successful.
        </p>

        <div className="order-info">

          <p>
            Your order is confirmed.
          </p>

          <p>
            We will process it soon.
          </p>

        </div>

        <Link to="/shop">

          <button>
            Continue Shopping
          </button>

        </Link>

      </div>

    </div>
  );
}

export default OrderSuccessPage;