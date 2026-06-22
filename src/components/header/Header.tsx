import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useTranslation }
from "react-i18next";

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
// import logoLight from "../../assets/kaira-logo-dark.png";
// import logoDark from "../../assets/kaira-logo-light.png";
import logoLight from "../../assets/logo/kaira-logo-light.png";
import logoDark from "../../assets/logo/kaira-logo.png";

function Header() {

  const dispatch: any = useDispatch();

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const { t, i18n } =
  useTranslation();

  const changeLanguage =
  (lang: string) => {
    i18n.changeLanguage(lang);
    console.log(lang)
  };

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

    if (!search.trim())
      return;

    dispatch(
      setSearchTerm(
        search
      )
    );

    navigate(
      "/search"
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

            placeholder={t("search_products")}
          />

          <button
            onClick={
              handleSearch
            }
          >
            {t("search")}
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

        

          <select  className="lang-select"
            onChange={(e) =>
            changeLanguage(
            e.target.value
            )
            }
            >

            <option value="en">
            EN
            </option>

            <option value="bn">
            বাংলা
            </option>

            <option value="hi">
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
                {t("logout")}
              </button>

            </div>

            :

            <Link to="/login" className="logout-btn">  
                {t("login")}
            </Link>
          }

        </div>

      </header>

      {/* NAVBAR */}

      <nav className="navbar">

        <Link to="/">
          {t("home")}
        </Link>

        <Link to="/shop">
          {t("shop")}
        </Link>

         <span
          onClick={() =>
            goProtected(
              "/wishlist"
            )
          }
        >
          {t("wishlist")}
        </span>

        <span
          onClick={() =>
            goProtected(
              "/cart"
            )
          }
        >
          {t("cart")}
        </span>

        {/* <Link to="/sale">
          {t("sale")}
        </Link> */}

        <Link to="/contact">
          {t("contact")}
        </Link>
      </nav>
    </>
  );
}

export default Header;