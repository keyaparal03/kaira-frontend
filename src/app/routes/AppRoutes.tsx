import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/*
|--------------------------------------------------------------------------
| Layout
|--------------------------------------------------------------------------
*/

import MainLayout from "../../layouts/MainLayout";

/*
|--------------------------------------------------------------------------
| Public Pages
|--------------------------------------------------------------------------
*/

import HomePage from "../../pages/Home/HomePage";
import ShopPage from "../../pages/Shop/ShopPage";
import ProductDetails from "../../pages/Products/ProductDetails";

/*
|--------------------------------------------------------------------------
| Auth Pages
|--------------------------------------------------------------------------
*/

import LoginPage from "../../pages/Auth/Login/LoginPage";
import RegisterPage from "../../pages/Auth/Register/RegisterPage";

/*
|--------------------------------------------------------------------------
| User Pages
|--------------------------------------------------------------------------
*/

import CartPage from "../../pages/Cart/CartPage";
import WishlistPage from "../../pages/Wishlist/WishlistPage";
import CheckoutPage from "../../pages/Checkout/CheckoutPage";
import OrderSuccessPage from "../../pages/OrderSuccess/OrderSuccessPage";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* MAIN WEBSITE */}

        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/shop"
          element={
            <MainLayout>
              <ShopPage />
            </MainLayout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        {/* AUTH */}

        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />

        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />

        {/* USER */}

        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />

        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <WishlistPage />
            </MainLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          }
        />

        {/* NEW ORDER SUCCESS PAGE */}

        <Route
          path="/order-success"
          element={
            <MainLayout>
              <OrderSuccessPage />
            </MainLayout>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={
            <div
              style={{
                padding: "100px",
                textAlign: "center",
                fontSize: "30px"
              }}
            >
              404 - Page Not Found
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;