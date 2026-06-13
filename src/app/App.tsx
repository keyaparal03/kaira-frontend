import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HomePage
from "../pages/Home/HomePage";

import MainLayout
from "../layouts/MainLayout";
import React from "react";

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

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;