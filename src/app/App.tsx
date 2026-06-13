import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/Home/HomePage";
import ShopPage from "../pages/Shop/ShopPage";
import ProductDetails from "../pages/Products/ProductDetails";

import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        {/* SHOP */}

        <Route
          path="/shop"
          element={
            <MainLayout>
              <ShopPage />
            </MainLayout>
          }
        />

        {/* PRODUCT DETAILS */}

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

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;