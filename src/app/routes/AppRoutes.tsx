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
import ProfilePage from "../../pages/Profile/ProfilePage";
import ContactPage from "../../pages/Contact/ContactPage";
import PublicRoute from "./PublicRoute";

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

const CategoryPage =
  lazy(() =>
    import("../../pages/Category/CategoryPage")
);

const SearchPage =
  lazy(() =>
    import("../../pages/Search/SearchPage")
);

const NotFoundPage =
  lazy(() =>
    import("../../pages/NotFound/NotFoundPage")
);

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
            path="/category/:categoryName"
            element={
              <MainLayout>
                <CategoryPage />
              </MainLayout>
            }
          />
          
          <Route
            path="/search"
            element={
              <MainLayout>
                <SearchPage />
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


          <Route
            path="/login"
            element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ProfilePage />
                  </MainLayout>
              </ProtectedRoute>
              }
            />

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

          <Route
            path="/contact"
            element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            }
          />

          <Route
            path="*"
            element={
              <MainLayout>
                <NotFoundPage />
              </MainLayout>
            }
          />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default AppRoutes;