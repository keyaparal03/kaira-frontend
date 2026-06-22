import React from "react";
import "./Loader.scss";

import logo from "../../assets/logo/kaira-logo.png";

function Loader() {
  return (
    <div className="luxury-loader">

      <img
        src={logo}
        alt="Kaira"
        className="loader-logo"
      />

    </div>
  );
}

export default Loader;