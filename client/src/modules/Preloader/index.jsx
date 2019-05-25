import React from "react";
import logo from "../../assets/img/preloader-logo.png";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader-image__container">
        <img src={logo} alt="wait" />
        <div className="preloader-animation__container">
          <div className="preloader-animation" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
