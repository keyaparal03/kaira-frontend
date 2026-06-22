import React, {
  useEffect
} from "react";

import {
  useDispatch
} from "react-redux";

import AppRoutes
from "./routes/AppRoutes";

import {
  fetchCart
} from "../redux/features/cartThunk";

import {
  fetchWishlist
} from "../redux/features/wishlistThunk";

import {
  getCurrentUser
} from "../redux/features/authThunk";

import {
  getAccessToken
} from "../utils/localStorage";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {

  const dispatch: any =
    useDispatch();

  useEffect(() => {

    const token =
      getAccessToken();

    if (token) {

      /*
      RESTORE USER
      */

      dispatch(
        getCurrentUser()
      );

      /*
      FETCH USER DATA
      */

      dispatch(
        fetchCart()
      );

      dispatch(
        fetchWishlist()
      );
    }

  }, [dispatch]);

  return (
    <>
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}

export default App;