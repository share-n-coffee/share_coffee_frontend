import React from "react";
import logo from "./logo.png";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="image__container">
        <img src={logo} alt="wait" />
        <div className="animation__container">
          <div className="animation" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
