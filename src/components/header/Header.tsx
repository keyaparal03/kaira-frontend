import React, {
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  Link,
  useNavigate
} from "react-router-dom";

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

function Header() {

  const dispatch: any =
    useDispatch();

  const navigate =
    useNavigate();

  const [search,
    setSearch] =
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

  const {
    user
  } = useSelector(
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
  CART TOTAL QTY
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

      navigate(
        "/shop"
      );
    };

  /*
  LOGOUT
  */

  const handleLogout =
    () => {

      dispatch(
        logoutUser()
      );

      navigate(
        "/login"
      );
    };

  /*
  PROTECTED HEADER CLICK
  */

  const goProtected =
    (
      path: string
    ) => {

      if (!user) {

        navigate(
          "/login"
        );

        return;
      }

      navigate(path);
    };

  return (
    <>
      {/* TOP BAR */}

      <div className="top-bar">

        <div className="top-left">
          Enhance Style In You ✨
        </div>

        <div className="top-right">

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

          <button
            onClick={() =>
              dispatch(
                toggleTheme()
              )
            }
          >
            {
              theme === "light"
              ? "🌙 Dark"
              : "☀ Light"
            }
          </button>

        </div>

      </div>

      {/* HEADER */}

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

        {/* HEADER ICONS */}

        <div className="header-icons">

          {/* WISHLIST */}

          <span
            style={{
              cursor: "pointer"
            }}

            onClick={() =>
              goProtected(
                "/wishlist"
              )
            }
          >
            ❤️
            {
              wishlistItems.length
            }
          </span>

          {/* CART */}

          <span
            style={{
              cursor: "pointer"
            }}

            onClick={() =>
              goProtected(
                "/cart"
              )
            }
          >
            🛒
            {
              cartCount
            }
          </span>

          {/* USER */}

          {
            user ?

            <>

              <span>
                Welcome,
                {
                  user?.name ||
                  user?.fullName ||
                  "User"
                }
              </span>

              <button
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>

            </>

            :

            <Link to="/login">

              <span>
                👤 Login
              </span>

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
          style={{
            cursor: "pointer"
          }}

          onClick={() =>
            goProtected(
              "/wishlist"
            )
          }
        >
          Wishlist
        </span>

        <span
          style={{
            cursor: "pointer"
          }}

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