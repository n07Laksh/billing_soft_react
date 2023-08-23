import React from "react";
import userImage from "../images/user.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-print-hide">
      <nav className="navbar navbar-expand-lg nav-div bg-body-tertiary ">
        <div className="container-fluid justify-content-end">
        <img src={userImage} className="userImage" alt="" />
            <Link className="me-5" > UserName </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
