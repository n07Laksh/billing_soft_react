import React, { useState } from "react";
import logoImage from "../images/ttslogopng.png";
import { Link } from "react-router-dom";
// const { ipcRenderer } = window.require("electron");

function Dashboard() {
  const [show, setShow] = useState(false);

  const openNewWin = (event) => {
    event.stopPropagation();
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }

    // ipcRenderer.send("button-click");
  };

  document.addEventListener("click", () => {
    // Check if the clicked element is not part of the saleDrop element
    if (show) {
      setShow(false);
    }
  });

  return (
    <div className="sidenav-print-hide">
      <div className="sidenav">
        <Link>
          <img src={logoImage} alt="" className="ttslogo" />
        </Link>

        <Link
          className="nav-tab "
          onClick={(event) => openNewWin(event)}
        >
          <i className="bi bi-cart-check me-2"></i>Sale
        </Link>

        {show && (
          <div id="sale-drop" className="sale-drop-hide sale-drop-show">
            <ul
              className="drop-ul"
              style={{ listStyleType: "none", color: "white" }}
            >
              <Link to="/saleinvoice" className="li">Sale Invoice</Link>
              <Link to="/addItem" className="mb-1 li">Add Item</Link>
            </ul>
          </div>
        )}

        <Link to="/purchase" className="nav-tab">
          <i className="bi bi-bag me-1"></i> Purchase
        </Link>
        <Link className="nav-tab">
          <i className="bi bi-boxes me-1"></i> Stocks
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
