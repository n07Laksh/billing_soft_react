import React from "react";

const SaleDetails = () => {
  return (
    <div className="d-flex justify-content-end gap-5">
      <div className="sale-texts">
        <div>Total</div>
        <div>Tax %</div>
        <div>Sub-Total</div>
      </div>
      <div className="sale-price">
        <div>1000</div>
        <div>180</div>
        <div>1180</div>
      </div>
    </div>
  );
};

export default SaleDetails;
