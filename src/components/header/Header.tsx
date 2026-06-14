import React from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  Link
} from "react-router-dom";

import {
  toggleTheme
} from "../../redux/features/themeSlice";

import "./Header.scss";

function Header() {
  const dispatch: any =
    useDispatch();

  /*
  -------------------------------
  Theme
  -------------------------------
  */

  const theme =
    useSelector(
      (state: any) =>
        state.theme.theme
    );

  /*
  -------------------------------
  Wishlist Count
  -------------------------------
  */

  const wishlistItems =
    useSelector(
      (state: any) =>
        state.wishlist
          ?.wishlistItems || []
    );

  /*
  -------------------------------
  Cart Count
  -------------------------------
  */

  const cartItems =
    useSelector(
      (state: any) =>
        state.cart
          ?.cartItems || []
    );

  return (
    <>
      {/* TOP BAR */}

      <div className="top-bar">

        <div className="top-left">
          Enhance Style In You ✨
        </div>

        <div className="top-right">

          {/* LANGUAGE */}

          <select>
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
            onClick={() =>
              dispatch(
                toggleTheme()
              )
            }
          >
            {theme === "light"
              ? "🌙 Dark"
              : "☀ Light"}
          </button>

        </div>

      </div>

      {/* MAIN HEADER */}

      <header className="header">

        {/* LOGO */}

        <div className="logo">

          <Link to="/">
            <span>
              KAIRA
            </span>
          </Link>

        </div>

        {/* SEARCH */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Search products..."
          />

          <button>
            Search
          </button>

        </div>

        {/* HEADER ICONS */}

        <div className="header-icons">

          {/* WISHLIST */}

          <Link to="/wishlist">

            <span>
              ❤️ Wishlist (
              {
                wishlistItems.length
              }
              )
            </span>

          </Link>

          {/* CART */}

          <Link to="/cart">

            <span>
              🛒 Cart (
              {
                cartItems.length
              }
              )
            </span>

          </Link>

          {/* LOGIN */}

          <Link to="/login">

            <span>
              👤 Login
            </span>

          </Link>

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

        <Link to="/wishlist">
          Wishlist
        </Link>

        <Link to="/cart">
          Cart
        </Link>

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