import React from "react";

import {
  Navigate
} from "react-router-dom";

import {
  useSelector
} from "react-redux";

function ProtectedRoute({
  children
}: any) {

  const {
    user
  } = useSelector(
    (state: any) =>
      state.auth
  );

  /*
  NOT LOGGED IN
  */

  if (!user) {

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