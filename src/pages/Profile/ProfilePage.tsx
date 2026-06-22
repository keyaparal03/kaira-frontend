import React, {
  useEffect
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchOrders
} from "../../redux/features/orderThunk";

import {
  logoutUser
} from "../../redux/features/authSlice";

import "./ProfilePage.scss";

function ProfilePage() {

  const dispatch: any =
    useDispatch();

  const {
    user
  } = useSelector(
    (state: any) =>
      state.auth
  );

  const {
    orders,
    loading
  } = useSelector(
    (state: any) =>
      state.order
  );

  useEffect(() => {

    dispatch(
      fetchOrders()
    );

  }, [dispatch]);

  return (

    <div className="profile-page">

      {/* LEFT */}

      <div className="profile-sidebar">

        <div className="user-card">

          <div className="avatar">
            👩
          </div>

          <h3>
            {user?.name}
          </h3>

          <p>
            {user?.email}
          </p>

        </div>

        <ul>

          <li>
            My Profile
          </li>

          <li>
            My Orders
          </li>

          <li>
            Wishlist
          </li>

          <li>
            Address
          </li>

          <li
            onClick={() =>
              dispatch(
                logoutUser()
              )
            }
          >
            Logout
          </li>

        </ul>

      </div>

      {/* RIGHT */}

      <div className="profile-content">

        {/* PERSONAL */}

        <div className="profile-box">

          <h2>
            Personal Details
          </h2>

          <p>

            <strong>
              Name:
            </strong>

            {user?.name}

          </p>

          <p>

            <strong>
              Email:
            </strong>

            {user?.email}

          </p>

        </div>

        {/* ORDERS */}

        <div className="profile-box">

          <h2>
            My Orders
          </h2>

          {
            loading &&

            <p>
              Loading...
            </p>
          }

          {
            orders?.length === 0 &&

            <p>
              No Orders Yet
            </p>
          }

          {
            orders?.map(
              (
                order: any
              ) => (

                <div
                  key={
                    order._id
                  }

                  className="order-card"
                >

                  <h4>

                    Order #

                    {
                      order._id
                    }

                  </h4>

                  <p>

                    Total :

                    ₹
                    {
                      order.totalAmount
                    }

                  </p>

                  <p>

                    Status :

                    {
                      order.status
                    }

                  </p>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;