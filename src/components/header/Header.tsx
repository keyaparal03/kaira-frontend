import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMoon,
  FiSun
} from "react-icons/fi";

import {
  toggleTheme
} from "../../redux/features/themeSlice";

import {
  logoutUser
} from "../../redux/features/authSlice";

import {
  setSearchTerm
} from "../../redux/features/productSlice";

import "./Header.scss";
import logoLight from "../../assets/kaira-logo-dark.png";
import logoDark from "../../assets/kaira-logo-light.png";

function Header() {

  const dispatch: any = useDispatch();

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  /*
  THEME
  */

  const theme =
    useSelector(
      (state: any) =>
        state.theme.theme
    );

  /*
  AUTH
  */

  const { user } =
    useSelector(
      (state: any) =>
        state.auth
    );

  /*
  WISHLIST
  */

  const wishlistItems =
    useSelector(
      (state: any) =>
        state.wishlist
          ?.wishlistItems || []
    );

  /*
  CART
  */

  const cartItems =
    useSelector(
      (state: any) =>
        state.cart
          ?.cartItems || []
    );

  /*
  TOTAL CART QTY
  */

  const cartCount =
    cartItems.reduce(
      (
        total: number,
        item: any
      ) =>
        total +
        item.quantity,
      0
    );

  /*
  SEARCH
  */

  const handleSearch =
    () => {

      dispatch(
        setSearchTerm(
          search
        )
      );

      navigate("/shop");
    };

  /*
  LOGOUT
  */

  const handleLogout =
    () => {

      dispatch(
        logoutUser()
      );

      navigate("/login");
    };

  /*
  PROTECTED ROUTE
  */

  const goProtected =
    (path: string) => {

      if (!user) {
        navigate("/login");
        return;
      }

      navigate(path);
    };

  return (
    <>
      {/* HEADER */}

      <header className="header">

        {/* LOGO */}

        <div className="logo">

          <Link to="/">

           <img
              src={
                theme === "dark"
                  ? logoDark
                  : logoLight
              }
              alt="logo"
            />

          </Link>

        </div>

        {/* SEARCH */}

        <div className="search-box">

          <input
            type="text"

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="Search products..."
          />

          <button
            onClick={
              handleSearch
            }
          >
            Search
          </button>

        </div>

        {/* RIGHT SECTION */}

        <div className="header-icons">

          {/* WISHLIST */}

          <div
            className="icon-box"

            onClick={() =>
              goProtected(
                "/wishlist"
              )
            }
          >

            <FiHeart
              className="header-icon"
            />

            {
              wishlistItems.length > 0 && (

                <span className="count-badge">
                  {
                    wishlistItems.length
                  }
                </span>

              )
            }

          </div>

          {/* CART */}

          <div
            className="icon-box"

            onClick={() =>
              goProtected(
                "/cart"
              )
            }
          >

            <FiShoppingCart
              className="header-icon"
            />

            {
              cartCount > 0 && (

                <span className="count-badge">
                  {cartCount}
                </span>

              )
            }

          </div>

          {/* LANGUAGE */}

          <select className="lang-select">

            <option>
              EN
            </option>

            <option>
              বাংলা
            </option>

            <option>
              हिन्दी
            </option>

          </select>

          {/* THEME */}

          <button
            className="theme-btn"

            onClick={() =>
              dispatch(
                toggleTheme()
              )
            }
          >

            {
              theme === "light"

              ?

              <FiMoon />

              :

              <FiSun />
            }

          </button>

          {/* USER */}

          {
            user ?

            <div className="user-section">

              <span className="welcome-user">

                Hi,

                {
                  user?.name ||

                  user?.fullName ||

                  "User"
                }

              </span>

              <button
                className="logout-btn"

                onClick={
                  handleLogout
                }
              >
                Logout
              </button>

            </div>

            :

            <Link to="/login">

              <div className="login-box">

                <FiUser
                  className="header-icon"
                />

              </div>

            </Link>
          }

        </div>

      </header>

      {/* NAVBAR */}

      <nav className="navbar">

        <Link to="/">
          Home
        </Link>

        <Link to="/shop">
          Shop
        </Link>

        <span
          onClick={() =>
            goProtected(
              "/wishlist"
            )
          }
        >
          Wishlist
        </span>

        <span
          onClick={() =>
            goProtected(
              "/cart"
            )
          }
        >
          Cart
        </span>

        <Link to="/sale">
          Sale
        </Link>

        <Link to="/contact">
          Contact
        </Link>

      </nav>
    </>
  );
}

export default Header;