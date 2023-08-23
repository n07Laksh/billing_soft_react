import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function SaleInvoice() {
  const navigate = useNavigate();
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const [currentDate, setCurrentDate] = useState(formattedDate);

  const handleDateChange = (event) => {
    setCurrentDate(event.target.value);
  };
  const [saleData, setSaleData] = useState({
    invoiceType:"",
    supplierName:"",
    billNum:"",
    tag: "",
    name: "",
    unit: "KG",
    quantity: "",
    salePrice: "",
    disc: "",
    gst: "",
    amount: "",
    payMode:"",
    date:currentDate,
  });

  const tbody = useRef(); // table body
  const tableDiv = useRef(); // table parent div

  const inputChange = (event) => {
    setSaleData({
      ...saleData,
      [event.target.name]: event.target.value,
    });
  };

  const addSaleItem = () => {
    if (
      (saleData.name &&
        saleData.quantity &&
        saleData.salePrice &&
        saleData.amount) !== ""
    ) {
      let newRow = `<tr>
      <td>${saleData.name}</td>
      <td>${saleData.tag}</td>
      <td>${saleData.quantity}</td>
      <td>${saleData.unit}</td>
      <td>${saleData.salePrice}</td>
      <td>${saleData.disc === "" ? "0" : saleData.disc}</td>
      <td>${saleData.gst === "" ? "0" : saleData.gst}</td>
      <td>${saleData.amount}</td>
    </tr>`;

      // Append the new row to the table body
      // tbody.current.appendChild(newRow);
      tbody.current.insertAdjacentHTML("beforeend", newRow);

      tableDiv.current.scrollTop = tableDiv.current.scrollHeight;
      setSaleData({
        tag: "",
        name: "",
        unit: "KG",
        quantity: "",
        salePrice: "",
        disc: "",
        gst: "",
        amount: "",
      });
    } else {
      alert("require fields are not empty");
    }
  };

  const savePrint = () => {
    window.print();
  };
  console.log(saleData);

  return (
    <>
      <div className="sale-content-parentdiv">

        <div className="back-div">
          <span onClick={()=>navigate(-1)}>&larr;</span>
          <Link to="/addItem" className="back-div-add-item-sec">Add Items</Link>
        </div>

        <div className="mx-4 mt-3 user-info gap-3">
          <div>

            <label htmlFor="invoiceType" className="lable-txt">
              Invoice Type
            </label>
            <br />
            <select
              onChange={inputChange}
              id="invoice-type"
              name="invoiceType"
              value={saleData.invoiceType}
            >
              <option value="no">No GST</option>
              <option value="gst">GST</option>
            </select>
          </div>

          <div>
            <label htmlFor="supplierName" className="lable-txt">
              Supplier Name<span className="text-danger mx-1">*</span>
            </label>
            <br />
            <input type="text" name="supplierName" id="supplierName" value={saleData.supplierName} onChange={inputChange}/>
          </div>

          <div>
            <label htmlFor="billDate" className="lable-txt">
              Bill Date
            </label>
            <br />
            <input
                onChange={handleDateChange}
                type="date"
                value={currentDate}
                name="date"
                className="date"
                // max={currentDate}
              />
          </div>

          <div>
            <label htmlFor="billNum" className="lable-txt">
              Purchase Bill No.
            </label>
            <br />
              
            <input type="text" name="billNum" className="billNum" value={saleData.billNum} onChange={inputChange}/>
          </div>

        </div>



        <div className="item-section mt-4 mx-4">
          <div>
            <label className="lable-txt" htmlFor="tag ">
              Item tag
            </label>
            <br />
            <input
              onChange={inputChange}
              type="text"
              id="tag"
              className="tag"
              name="tag"
              value={saleData.tag}
            />
          </div>
          <div>
            <label className="lable-txt" htmlFor="name">
              Name <span className="text-danger">*</span>
            </label>
            <br />
            <input
              onChange={inputChange}
              type="text"
              id="name"
              className="name"
              name="name"
              value={saleData.name}
            />
          </div>
          <div>
            <label className="lable-txt" htmlFor="unit">
              Unit
            </label>
            <br />
            <select
              onChange={inputChange}
              id="unit"
              name="unit"
              value={saleData.unit}
            >
              <option value="KG">KG (Kilogram)</option>
              <option value="LT">LT (Liter)</option>
              <option value="BG">BG (Bag)</option>
            </select>
          </div>
          <div>
            <label className="lable-txt" htmlFor="quantity">
              Quantity <span className="text-danger">*</span>
            </label>
            <br />
            <input
              onChange={inputChange}
              type="text"
              id="quantity"
              className="quantity"
              name="quantity"
              value={saleData.quantity}
            />
          </div>
          <div>
            <label className="lable-txt" htmlFor="sale-price">
              Sale Price <span className="text-danger">*</span>
            </label>
            <br />
            <span className="ruppe-div">&#8377; </span>
            <input
              onChange={inputChange}
              type="text"
              id="sale-price"
              className="sale-price"
              name="salePrice"
              value={saleData.salePrice}
            />
          </div>
          <div>
            <label className="lable-txt" htmlFor="disc">
              Disc %
            </label>
            <br />
            <span className="percent-div"> % </span>
            <input
              onChange={inputChange}
              type="text"
              id="disc"
              className="disc"
              name="disc"
              value={saleData.disc}
            />
          </div>
          <div>
            <label className="lable-txt" htmlFor="gst">
              GST %
            </label>
            <br />
            <span className="percent-div"> % </span>
            <input
              onChange={inputChange}
              type="text"
              id="gst"
              className="gst"
              name="gst"
              value={saleData.gst}
            />
          </div>

          <div>
            <label className="lable-txt" htmlFor="amount">
              Amount <span className="text-danger">*</span>
            </label>
            <br />
            <span className="ruppe-div"> &#8377; </span>
            <input
              onChange={inputChange}
              type="text"
              id="amount"
              className="amount"
              name="amount"
              value={saleData.amount}
            />
          </div>
        </div>
        <div className="add-btn-parent mt-3 me-3">
          <button
            onClick={addSaleItem}
            className="btn btn-primary btn-sm add-btn "
          >
            Add
          </button>
        </div>

        {/* div for spacing */}
        <div className="d-block space-div "></div>

        {/* add item list */}
        <div ref={tableDiv} className="item-list-parent mx-3 border">
          <table className="table caption-top text-center ">
            <thead className="table-info">
              <tr>
                <th className="name-head" scope="col">
                  Name
                </th>
                <th scope="col">Tag</th>
                <th scope="col">Qunatity</th>
                <th scope="col">Unit</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Discount</th>
                <th scope="col">Tax</th>
                <th scope="col">Total Amount</th>
              </tr>
            </thead>
            <tbody ref={tbody}></tbody>
          </table>
        </div>

        <div className="sale-invoice-footer mx-3 my-1">
          <div className="payment d-flex justify-content-center gap-5">
            <div>
              <label className="lable-txt" htmlFor="payMode">
                Payment Mode
              </label>
              <br />
              <select
                onChange={inputChange}
                id="payMode"
                name="payMode"
                value={saleData.payMode}
              >
                <option value="cash">Cash</option>
                <option value="upi">UPI (Online Payment)</option>
                <option value="cheque">Cheque</option>
                <option value="card">Card Payment</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>
            <div>
            <div>
              <label className="lable-txt calc-amount-txt" htmlFor="paidAmount">Amount Paid</label>
              <input type="text" name="paidAmount" />
            </div>
            <div>
              <label className="lable-txt calc-amount-txt" htmlFor="bal">Balance</label>
              <input type="text" name="bal" />
            </div>
            </div>
          </div>

          <div className="print-save">
          <div className="sub-total-shelter d-flex justify-content-between">
            <div>Sub-Total</div>
            <div>0.00</div>
          </div>
          <div className="sub-total d-flex justify-content-between">
          <div>add CGST(0%)</div>
            <div>0.00</div>
          </div>
          <div className="sub-total d-flex justify-content-between">
          <div>add SGST(0%)</div>
            <div>0.00</div>
          </div>
          <div className="sub-total-shelter d-flex justify-content-between">
          <div>GRAND TOTAL</div>
            <div>0.00</div>
          </div>
            <button onClick={savePrint} className="btn btn-sm btn-primary mt-1 w-75">
              Save & Print
            </button>
          </div>
        </div>


      </div>
    </>
  );
}

export default SaleInvoice;
