import React from "react";

import {
  Navigate
} from "react-router-dom";

import {
  useSelector
} from "react-redux";

import Loader from "../../components/loader/Loader";

function PublicRoute({
  children
}: any) {

  const {
    user,
    loading
  } = useSelector(
    (state: any) =>
      state.auth
  );

  /*
  WAIT WHILE
  getCurrentUser() runs
  */

  if (loading) {

    return <Loader />;
  }

  /*
  IF ALREADY LOGGED IN
  */

  if (user) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

export default PublicRoute;