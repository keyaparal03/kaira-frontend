import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";
import logoLight from "../../assets/logo/kaira-logo-light.png";
import logoDark from "../../assets/logo/kaira-logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* BRAND */}

        <div className="footer-brand">

          <div className="logo">

          <Link to="/">

           <img
              src={logoDark}
              alt="logo"
            />

          </Link>

        </div>

          <p>
            Premium women fashion, handmade jewellery
            & oxidised accessories crafted to enhance
            style in you.
          </p>

          <div className="social-links">

            <a
              href="https://www.facebook.com/stylewithkaira/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube />
            </a>

        </div>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-links">

          <h3>
            Quick Links
          </h3>

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

        </div>

        {/* POLICY */}

        <div className="footer-links">

          <h3>
            Policies
          </h3>

          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Return Policy
          </a>

          <a href="#">
            Shipping Policy
          </a>

          <a href="#">
            Terms & Conditions
          </a>

        </div>

        {/* CONTACT */}

        <div className="footer-contact">

          <h3>
            Contact Us
          </h3>

          <p>
            Address: 13, Bholanath Nandi Ln, Belepole, Shibpur, Howrah, West Bengal 711104
          </p>

          <p>
            support@kairastyle.in
          </p>

          <p>
            +91 8013623674
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 Kaira Fashion | All Rights Reserved | Designed & Developed by Keya Paral

      </div>

    </footer>
  );
}

export default Footer;