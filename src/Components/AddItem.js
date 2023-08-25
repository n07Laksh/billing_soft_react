import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dexie from "dexie";

// Import the required libraries
// const { MongoClient } = require('mongodb');
// const { openDB } = require('indexeddb');
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
    getIdbData();
  }, []);

  const db = new Dexie('items');
  db.version(2).stores({
    itemData: 'productName',
  });

  const handleSave = () => {
    if (
      items.productName &&
      items.purchasePrice &&
      items.salePrice &&
      items.unit
    ) {

      db.transaction('rw', db.itemData, async () => {
        try {
          const proName = await db.itemData.add(items);
          console.log(`Item added with Product Name: ${proName}`);
          console.log('Item Saved');
          getIdbData();
        } catch (error) {
          console.error(`Error adding item: ${error}`);
          alert('An error occurred while saving the item.');
        }
      }).catch((error) => {
        console.error(`Transaction error: ${error}`);
        alert('An error occurred while processing the transaction.');
      });

    } else {
      console.log('Fill all the Required fields');
    }
  };

  const getIdbData = async () => {
    const db = new Dexie('items');
    db.version(2).stores({
      itemData: 'productName', // keyPath is set here
    });

    db.open().then(() => {
      console.log('IndexedDB Connected');
    }).catch((error) => {
      console.error('Error opening IndexedDB:', error);
    });

    db.on('versionchange', () => {
      db.close();
      alert('Another tab requested a version change. Closing the database.');
    });


    try {
      // const db = new Dexie('items');
      // db.version(2).stores({
      //   itemData: 'productName',
      // });

      const items = await db.itemData.toArray();
      console.log("Fetched data from IndexedDB:", items);

      // function for sending data to electron js
      // store.set("dataToSync", items);

      // ipcRenderer.invoke('mongodb')
      //   .then(result => {
      //     console.log('Data synced to MongoDB:', result);
      //     setSynced(true);
      //   })
      //   .catch(error => {
      //     console.error('Error syncing data to MongoDB:', error);
      //   });

      // Now you can send the items to your Electron app using IPC
      // ipcRenderer.send("sync-data-to-mongodb", items);

    } catch (error) {
      console.error('Error fetching and syncing data:', error);
    }
  };


  // delete the item from indexedDB
  // const deleteItem = () => {
  //   const dbPromise = indexedDB.open('items', 2);

  //   dbPromise.onsuccess =() => {
  //     const db = dbPromise.result;

  //     const tx = db.transaction("itemData", "readwrite")

  //     const itemData = tx.objectStore("itemData");

  //     // const delItem = itemData.delete("aaa");
  //     const delItem = itemData.delete("aaa");

  //     delItem.onsuccess = () => {
  //       alert("Item Deleted");
  //       getIdbData();
  //     }

  //     tx.oncomplete = () => {
  //       db.close();
  //     }

  //     delItem.onerror = (event) => {
  //       let err = (event.target.error).toString().slice(16);
  //       alert(err);
  //     }
  //   }

  // }

  return (
    <>
      <div className="sale-content-parentdiv">

        <div className="back-div">
          <span onClick={() => navigate(-1)} className="back">&larr;</span> <span className="mx-5 h6">Add Items</span>
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
                <input type="number" name="purchasePrice" onChange={inputChange} />
              </div>

              <div>
                <label className="additem-label" htmlFor="salePrice"> Sale Price <span className="text-danger mx-1">*</span></label>
                <input type="number" name="salePrice" onChange={inputChange} />

              </div>

              <div className="mb-4">
                <label className="additem-label" htmlFor="unit">Unit <span className="text-danger mx-1">*</span></label>
                <select id="unit" name="unit" onChange={inputChange}>
                  <option value="No">None</option>
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

            </div>
          </div>

          <div className="price-details ">

            <h6 className="product-heading">GST Details</h6>

            <div className="gst-item">

              <div>
                <label className="additem-label" htmlFor="hsn_sac"> HSN / SAC Code </label>
                <input className="disable" type="number" name="hsn_sac" onChange={inputChange} disabled />
              </div>

              <div>
                <label className="additem-label" htmlFor="gst_rates"> GST Rates <span className="text-danger mx-1">*</span> </label>
                <br />
                <div className="d-flex flex-wrap gap-2 mt-2 ms-4">
                  <input className="disable" type="text" name="cgst" onChange={inputChange} placeholder="CGST" disabled />
                  <input className="disable" type="text" name="cess" onChange={inputChange} placeholder="Cess" disabled />
                  <input className="disable" type="text" name="sgst" onChange={inputChange} placeholder="SGST" disabled />
                  <input className="disable" type="text" name="igst" onChange={inputChange} placeholder="IGST" disabled />
                </div>

              </div>

            </div>

          </div>


        </div>

        <div style={{ float: "right", marginRight: "70px" }} className="save-div "><button onClick={handleSave} className="btn btn-primary"><i className="bi bi-save2 me-1"> {"  "}</i> SAVE</button>

          {/* <button onClick={deleteItem} className="btn btn-primary ms-1"><i className="bi bi-del me-1"> {"  "}</i> Delete</button> */}

        </div>

      </div>
    </>
  );
};

export default AddItem;
