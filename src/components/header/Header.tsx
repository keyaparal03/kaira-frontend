import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";

import "./Header.scss";

function Header() {
  const dispatch = useDispatch();

  const theme = useSelector(
    (state: any) => state.theme.theme
  );

  return (
    <>
      {/* TOP BAR */}

      <div className="top-bar">
        <div className="top-left">
          Enhance Style In You ✨
        </div>

        <div className="top-right">
          <select>
            <option>EN</option>
            <option>বাংলা</option>
            <option>हिन्दी</option>
          </select>

          <button
            onClick={() =>
              dispatch(toggleTheme())
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
          <span>Kaira</span>
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

        {/* ICONS */}

        <div className="header-icons">
          <span>♡ Wishlist</span>

          <span>🛒 Cart</span>
        </div>

      </header>

      {/* NAVBAR */}

      <nav className="navbar">
        <a href="/">Home</a>

        <a href="/shop">
          shop
        </a>

        <a href="/women">
          Women
        </a>

        <a href="/beauty">
          Beauty
        </a>

        <a href="/sale">
          Sale
        </a>

        <a href="/contact">
          Contact
        </a>
      </nav>
    </>
  );
}

export default Header;