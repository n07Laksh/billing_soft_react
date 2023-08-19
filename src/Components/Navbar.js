import React from "react";
import Navigation from "./Navigation";
import userImage from "../images/user.png";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg nav-div bg-body-tertiary ">
        <div className="container-fluid justify-content-end">
        <img src={userImage} className="userImage" alt="" />
            <a className="me-5" href="">UserName </a>
        </div>
      </nav>
      <Navigation />
    </div>
  );
}

export default Navbar;
