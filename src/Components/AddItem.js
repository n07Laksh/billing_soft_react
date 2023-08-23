import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const idb = window.indexedDB;
// check where indexDB support or not
// !db?console.log("doesn't support indexDB"):console.log(db);

const AddItem = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({
    productName: "",
    purchasePrice: "",
    salePrice: "",
    unit: "",
    hsn_sac: "",
    cgst: "",
    igst: "",
    sgst: "",
    cess: ""
  });

  const inputChange = (event) => {
    setItems({
      ...items,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    if(!idb){
      console.log("IndexedDB not Supported");
      return;
    };

    const request = idb.open("items",2);

    request.onerror = (event) => {
      console.log("Error", event)
    };
    
    request.onupgradeneeded = (event) => {
      console.log("onupgrade")
      const db = request.result;
      if(!db.objectStoreNames.contains("itemData")){
        db.createObjectStore("itemData", {
          keyPath:"productName"
        })
      }
    }
    request.onsuccess = () => {
      console.log("IndexedDB Connected");
    }

    getIdbData();
  }, []);

  const handleSave = (event) => {
    const dbPromise = idb.open("items", 2);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("itemData","readwrite");
      
      const itemData = tx.objectStore("itemData");

      const users = itemData.put(items);

      users.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        }
        alert('Item Saved');
      };

      users.onerror = (event) => {
        console.error(` User Error: ${event}`);
      };
      
    }
    
  };

  const getIdbData = () => {
    if(!idb){
      console.log("IndexedDB not Supported");
      return;
    };

    const dbPromise = idb.open("items", 2);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("itemData","readonly");
      
      const itemData = tx.objectStore("itemData");

      const dbItems = itemData.getAll();

      dbItems.onsuccess = (query) => {
        console.log(query.srcElement.result)
      }

      tx.oncomplete = () => {
        db.close();
      }

      dbItems.onerror = (event) => {
        alert("Error", event)
      }
    }
    
  }
  return (
    <>
      <div className="sale-content-parentdiv">

        <div onClick={() => navigate(-1)} className="back-div">
          <span>&larr;</span>
        </div>

        <div className="item-list">

          <div className="product-details ">

              <h6 className="product-heading">Product Details</h6>

              <div className="product-items">

                <div>
                  <label className="additem-label" htmlFor="productName">Product Name <span className="text-danger mx-1">*</span> </label>
                  <input type="text" name="productName" onChange={inputChange} />
                </div>

                <div>
                  <label className="additem-label" htmlFor="purchasePrice"> Purchase Price <span className="text-danger mx-1">*</span></label>
                  <input type="text" name="purchasePrice" onChange={inputChange}/>
                </div>

                <div>
                  <label className="additem-label" htmlFor="salePrice"> Sale Price <span className="text-danger mx-1">*</span></label>
                  <input type="text" name="salePrice" onChange={inputChange}/>
                  
                </div>

                <div className="mb-4">
                  <label className="additem-label" htmlFor="unit">Unit <span className="text-danger mx-1">*</span></label>
                  <select id="unit" name="unit" onChange={inputChange}>
                      <option value="KG">KG (Kilogram)</option>
                      <option value="LT">LT (Liter)</option>
                      <option value="BG">BG (Bag)</option>
                  </select>
                </div>
                  
              </div>
          </div>

          <div className="price-details ">

            <h6 className="product-heading">GST Details</h6>

            <div className="gst-item">
                
                <div>
                  <label className="additem-label" htmlFor="hsn_sac"> HSN / SAC Code </label>
                  <input type="text" name="hsn_sac" onChange={inputChange}/>  
                </div>

                <div>
                  <label className="additem-label" htmlFor="gst_rates"> GST Rates <span className="text-danger mx-1">*</span> </label>
                 <br/>
                 <div className="d-flex flex-wrap gap-2 mt-2 ms-4">
                  <input type="text" name="cgst" onChange={inputChange} placeholder="CGST"/>  
                  <input type="text" name="cess" onChange={inputChange} placeholder="Cess"/>  
                  <input type="text" name="sgst" onChange={inputChange} placeholder="SGST"/>  
                  <input type="text" name="igst" onChange={inputChange} placeholder="IGST"/>  
                  </div>
                  
                </div>

            </div>

          </div>


        </div>

          <div style={{float:"right",marginRight:"70px"}} className="save-div "><button onClick={handleSave} className="btn btn-primary"><i className="bi bi-save2 me-1"> {"  "}</i> SAVE</button></div>

      </div>
    </>
  );
};

export default AddItem;
