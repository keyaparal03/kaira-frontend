// import React from "react";

// import {
//   Navigate
// } from "react-router-dom";

// import {
//   getAccessToken
// } from "../utils/localStorage";

// function PublicRoute({
//   children
// }: any) {

//   const token =
//     getAccessToken();

//   /*
//   ALREADY LOGGED IN
//   */

//   if (token) {

//     return (
//       <Navigate
//         to="/"
//         replace
//       />
//     );
//   }

//   return children;
// }

// export default PublicRoute;