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
| Future Pages (Create Later)
|--------------------------------------------------------------------------
*/

// import CartPage from "../pages/Cart/CartPage";
// import WishlistPage from "../pages/Wishlist/WishlistPage";
// import CheckoutPage from "../pages/Checkout/CheckoutPage";
// import ProfilePage from "../pages/Profile/ProfilePage";
// import OrdersPage from "../pages/Orders/OrdersPage";
// import AdminDashboard from "../pages/Admin/AdminDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ========================================
            MAIN WEBSITE ROUTES
        ======================================== */}

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

        {/* ========================================
            AUTH ROUTES
        ======================================== */}

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

        {/* ========================================
            USER ROUTES (MODULE 3+)
        ======================================== */}

        {/*

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

        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <MainLayout>
              <OrdersPage />
            </MainLayout>
          }
        />

        */}

        {/* ========================================
            ADMIN ROUTES (FUTURE)
        ======================================== */}

        {/*
        <Route
          path="/admin"
          element={
            <AdminDashboard />
          }
        />
        */}

        {/* ========================================
            404 PAGE
        ======================================== */}

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