import React from "react";

import {
  useSelector,
  useDispatch
} from "react-redux";

import {
  Link,
  Outlet,
  useLocation
} from "react-router-dom";

import {
  logoutUser
} from "../../redux/features/authSlice";

import "./ProfilePage.scss";

function ProfilePage() {

  const dispatch:any =
    useDispatch();

  const location =
    useLocation();

  const {
    user
  } = useSelector(
    (state:any)=>
      state.auth
  );

  return (

    <div className="profile-page">

      {/* LEFT SIDEBAR */}

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

          <li
            className={
              location.pathname ===
              "/my-account/profile"

              ? "active"

              : ""
            }
          >

            <Link
              to="/my-account/profile"
            >
              My Profile
            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/my-account/orders"

              ? "active"

              : ""
            }
          >

            <Link
              to="/my-account/orders"
            >
              My Orders
            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/my-account/wishlist"

              ? "active"

              : ""
            }
          >

            <Link
              to="/my-account/wishlist"
            >
              Wishlist
            </Link>

          </li>

          <li>

            <button className="logout-btn"
              onClick={()=>

                dispatch(
                  logoutUser()
                )
              }
            >
              Logout
            </button>

          </li>

        </ul>

      </div>

      {/* RIGHT CONTENT */}

      <div className="profile-content">

        <Outlet />

      </div>

    </div>
  );
}

export default ProfilePage;