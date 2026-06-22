import React from "react";

import {
  Navigate
} from "react-router-dom";

import {
  useSelector
} from "react-redux";

import Loader from "../../components/loader/Loader";


import {
  getAccessToken
} from "../../utils/localStorage";

function ProtectedRoute({
  children
}: any) {

  const {
    user,
    loading
  } = useSelector(
    (state: any) =>
      state.auth
  );

  const token =
    getAccessToken();

  /*
  WAIT WHILE RESTORING USER
  */

  if (loading) {
    return <Loader />;
  }

  /*
  NO TOKEN = NOT LOGGED IN
  */

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;