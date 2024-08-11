import React from "react";
import { assets } from "../../assets/assets";
import './navbar.css'

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <img src={assets.logo} alt="" className="logo"/>
        <img src={assets.profile_image} alt="" className="profile" />
      </div>
    </div>
  );
};

export default Navbar;
