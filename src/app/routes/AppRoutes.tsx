import React, {
  Suspense,
  lazy
} from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../../components/loader/Loader";
/*
|--------------------------------------------------------------------------
| LAZY IMPORTS
|--------------------------------------------------------------------------
*/

const HomePage =
  lazy(() =>
    import("../../pages/Home/HomePage")
  );

const ShopPage =
  lazy(() =>
    import("../../pages/Shop/ShopPage")
  );

const ProductDetails =
  lazy(() =>
    import("../../pages/Products/ProductDetails")
  );

const LoginPage =
  lazy(() =>
    import("../../pages/Auth/Login/LoginPage")
  );

const RegisterPage =
  lazy(() =>
    import("../../pages/Auth/Register/RegisterPage")
  );

const CartPage =
  lazy(() =>
    import("../../pages/Cart/CartPage")
  );

const WishlistPage =
  lazy(() =>
    import("../../pages/Wishlist/WishlistPage")
  );

const CheckoutPage =
  lazy(() =>
    import("../../pages/Checkout/CheckoutPage")
  );

const OrderSuccessPage =
  lazy(() =>
    import("../../pages/OrderSuccess/OrderSuccessPage")
  );

/*
|--------------------------------------------------------------------------
| LOADER
|--------------------------------------------------------------------------
*/

// const Loader = () => (
//   <div
//     style={{
//       minHeight: "70vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontSize: "22px",
//       fontWeight: 600
//     }}
//   >
//     Loading...
//   </div>
// );

function AppRoutes() {
  return (
    <BrowserRouter>

      <Suspense fallback={<Loader />}>

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

          {/* PROTECTED ROUTES */}

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

      </Suspense>

    </BrowserRouter>
  );
}

export default AppRoutes;