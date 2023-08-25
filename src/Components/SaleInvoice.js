import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShopDetails from "./ShopDetails";
import CustomerDetails from "./CustomerDetails";
import SaleDetails from "./SaleDetails";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function SaleInvoice() {
  const navigate = useNavigate();

  const [addedItems, setAddedItems] = useState([]);
  const [total, setTotal] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Calculate total based on updated addedItems
    const newTotal = addedItems.reduce((sub, item) => {
      return sub + Number(item.amount);
    }, 0);

    setTotal(newTotal);
    setGrandTotal(newTotal);

    tableDiv.current.scrollTop = tableDiv.current.scrollHeight;
  }, [addedItems]);

    // calculate the paid amount from clent (return or give)
    const checkPaid = (event) => {
      const val = event.target.value;

      if (val.length) {
      setBalance(total - val);
    } else {
      setBalance(0)
    }
  }

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const [currentDate, setCurrentDate] = useState(formattedDate);

  const handleDateChange = (event) => {
    setCurrentDate(event.target.value);
  };
  const [saleData, setSaleData] = useState({
    invoiceType: "No GST",
    invoiceNum: "",
    clientName: "",
    clientContact: "",
    clientAddress: "",
    tag: "",
    name: "",
    unit: "KG",
    quantity: "",
    salePrice: "",
    disc: "",
    gst: "",
    amount: "",
    payMode: "",
    date: currentDate,
  });

  const tableDiv = useRef(); // table parent div

  const inputChange = (event) => {
    setSaleData({
      ...saleData,
      [event.target.name]: event.target.value,
    });
  };

  const addSaleItem = () => {
    if(saleData.name && saleData.quantity && saleData.salePrice && saleData.amount && saleData.clientName) {

    setAddedItems(prevAddedItems => [...prevAddedItems, saleData]);

      setSaleData({tag: "", name: "", unit: "KG", quantity: "", salePrice: "", disc: "", gst: "", amount: "", });
    } else {
      toast.error("require fields are not empty");
    }
  };

  const savePrint = () => {
    window.print();
  };

  return (
    <>
    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <div className="sale-content-parentdiv">
        <div className="print-show">
          <div className="d-flex justify-content-start gap-5">
            <ShopDetails />
            <CustomerDetails />
          </div>
        </div>
        <div className="back-div">
          <span className="back" onClick={() => navigate(-1)}>&larr;</span><span className="mx-5 h6">Sale Invoice</span>
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
              <option value="No GST">No GST</option>
              <option value="GST">GST</option>
            </select>
          </div>

          <div>
            <label htmlFor="invoiceNum" className="lable-txt">
              Invoice No.<span className="text-danger mx-1">*</span>
            </label>
            <br />
            <input type="text" className="invoice-no" name="invoiceNum" value={saleData.invoiceNum} onChange={inputChange} />
          </div>

          <div>
            <label htmlFor="clientName" className="lable-txt">
              Client Name<span className="text-danger mx-1">*</span>
            </label>
            <br />
            <input type="text" name="clientName" id="clientName" value={saleData.clientName} onChange={inputChange} />
          </div>

          <div>
            <label htmlFor="clientContact" className="lable-txt">
              Contact Number
            </label>
            <br />
            <input type="number" name="clientContact" id="clientContact" value={saleData.clientContact} onChange={inputChange} />
          </div>

          <div>
            <label htmlFor="clientAddress" className="lable-txt">
              Client Address
            </label>
            <br />

            <input type="text" name="clientAddress" className="clientAddress" value={saleData.clientAddress} onChange={inputChange} />
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
            <select onChange={inputChange} d="unit" name="unit" value={saleData.unit}    >
              <option value="NO">None</option>
              <option value="BG">Bag (BG)</option>
              <option value="BTL">Bottle (BTL)</option>
              <option value="BX">Box (BX)</option>
              <option value="BDL">Bundles (BDL)</option>
              <option value="CAN">Cans (CAN)</option>
              <option value="CTN">Cortons (CTN)</option>
              <option value="DZN">Dozens (DZN)</option>
              <option value="GM">Grammes (GM)</option>
              <option value="KG">Kilograms (KG)</option>
              <option value="LT">Liter (LT)</option>
              <option value="MT">Meters (MT)</option>
              <option value="MLT">MiliLiter (MLT)</option>
              <option value="NUM">Numbers (NUM)</option>
              <option value="PAC">Packs (PAC)</option>
              <option value="PRS">Pairs (PRS)</option>
              <option value="PCS">Pieces (PCS)</option>
              <option value="QTL">Quintal (QTL)</option>
              <option value="ROL">Rolls (ROL)</option>
              <option value="SF">Square Feet (SF)</option>
              <option value="SM">Square Meter (SM)</option>
              <option value="TAB">Tablets (TAB)</option>
            </select>
          </div>
          <div>
            <label className="lable-txt" htmlFor="quantity">
              Quantity <span className="text-danger">*</span>
            </label>
            <br />
            <input
              onChange={inputChange}
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
            <tbody>
              {addedItems.map((item, index) => (
                <tr className="position-relative" key={index}>
                  <td>{item.name}</td>
                  <td>{item.tag === "" ? "__" : item.tag}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.salePrice}</td>
                  <td>{item.disc === "" ? "0" : item.disc}</td>
                  <td>{item.gst === "" ? "0" : item.gst}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sale-invoice-footer mx-3 my-1">
          <div className="payment d-flex justify-content-center gap-5">
            <div>
              <label className="lable-txt" htmlFor="date">
                Date
              </label>
              <br />
              <input
                onChange={handleDateChange}
                type="date"
                value={currentDate}
                name="date"
                className="date"
                max={currentDate}
              />
            </div>
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
                <input onChange={checkPaid} type="number" name="paidAmount" />
              </div>
              <div>
                <label className="lable-txt calc-amount-txt" htmlFor="bal">Balance</label>
                <input type="text" name="bal" disabled value={balance}/>
              </div>
            </div>
          </div>

          <div className="print-save">

            <div className="sub-total-shelter d-flex justify-content-between">
              <div>Sub-Total</div>
              <div>{total?total:"0.00"}</div>
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
              <div>{grandTotal?grandTotal:"0.00"}</div>
            </div>

            <button onClick={savePrint} className="btn btn-sm btn-primary mt-1 w-75">
              Save & Print
            </button>
          </div>
        </div>

        <div className="sale-details m-4">
          <SaleDetails />
        </div>

      </div>
    </>
  );
}

export default SaleInvoice;
