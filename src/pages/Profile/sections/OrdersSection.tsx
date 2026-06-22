import React, {
  useEffect
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchOrders
} from "../../../redux/features/orderThunk";

function OrdersSection() {

  const API_URL =
    "http://localhost:3500";

  const dispatch:any =
    useDispatch();

  const {
    orders,
    loading
  } = useSelector(
    (state:any)=>
      state.order
  );

  useEffect(() => {

    dispatch(
      fetchOrders()
    );

  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (

    <div className="profile-box">

      <h2>
        My Orders
      </h2>

      {
        orders?.map(
          (order:any)=>(

          <div
            className="order-card"
            key={order._id}
          >

            {/* ORDER HEADER */}

            <div className="order-top">

              <div>

                <h3>
                  Order #
                  {order._id}
                </h3>

                <p>
                  Date :
                  {
                    new Date(
                      order.createdAt
                    ).toLocaleDateString()
                  }
                </p>

              </div>

              <div>

                <span>
                  Status :
                  {order.orderStatus}
                </span>

                <p>
                  Payment :
                  {order.paymentStatus}
                </p>

              </div>

            </div>

            {/* PRODUCTS */}

            <div className="order-products">

              {
                order.items?.map(
                  (
                    item:any
                  ) => (

                  <div
                    className="product-row"
                    key={item._id}
                  >

                    <img
                      src={`${API_URL}${item.product.image}`}
                      alt=""
                    />

                    <div>

                      <h4>
                        {
                          item.product.name
                        }
                      </h4>

                      <p>
                        Qty :
                        {
                          item.quantity
                        }
                      </p>

                      <p>
                        ₹
                        {
                          item.price
                        }
                      </p>

                    </div>

                  </div>
                ))
              }

            </div>

            {/* FOOTER */}

            <div className="order-footer">

              <p>

                Total :

                ₹
                {
                  order.totalAmount
                }

              </p>

              <p>

                Address :

                {
                  order.shippingAddress
                }

              </p>

            </div>

          </div>
        ))
      }

    </div>
  );
}

export default OrdersSection;