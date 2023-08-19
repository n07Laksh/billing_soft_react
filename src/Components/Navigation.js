import React from "react";
import logoImage from "../images/ttslogopng.png";

function Dashboard() {
  return (
    <div>
      <div className="sidenav">
        <a href="">
          <img src={logoImage} alt="" className="ttslogo" />
        </a>
        <a className="nav-tab" href="#services"><i className="bi bi-cart-check me-2"></i>Sale</a>
        <a className="nav-tab" href="#clients"><i className="bi bi-bag me-1"></i> Purchase</a>
        <a className="nav-tab" href="#contact"><i className="bi bi-boxes me-1"></i> Stocks</a>
      </div>
    </div>
  );
}

export default Dashboard;
