import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import HomePage from "../../pages/Home/HomePage";
import ShopPage from "../../pages/Shop/ShopPage";
import ProductDetails from "../../pages/Products/ProductDetails";

import LoginPage from "../../pages/Auth/Login/LoginPage";
import RegisterPage from "../../pages/Auth/Register/RegisterPage";

import CartPage from "../../pages/Cart/CartPage";
import WishlistPage from "../../pages/Wishlist/WishlistPage";
import CheckoutPage from "../../pages/Checkout/CheckoutPage";
import OrderSuccessPage from "../../pages/OrderSuccess/OrderSuccessPage";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

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
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* PROTECTED */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CartPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <MainLayout>
                <WishlistPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CheckoutPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OrderSuccessPage />
              </MainLayout>
            </ProtectedRoute>
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