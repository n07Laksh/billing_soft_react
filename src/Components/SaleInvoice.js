import React from 'react'

function SaleInvoice() {
  return (
    <>
    <div className="sale-content-parentdiv">
        <div className="back-div"><span>&larr;</span></div>
      
      <div className="item-section">
        <label htmlFor='tag'>Tag</label>
        <input type="text" id="tag" className='tag' name='tag'/>

        <label htmlFor='name'>Name</label>
        <input type="text" id="name" className='name' name='name'/>

        <label htmlFor='unit'>Unit</label>
        <input type="text" id="unit" className='unit' name='unit'/>

        <label htmlFor='quantity'>Quantity</label>
        <input type="text" id="quantity" className='quantity' name='quantity'/>

        <label htmlFor='sale-price'>Sale Price</label>
        <input type="text" id="sale-price" className='sale-price' name='sale-price'/>


      </div>
    </div>
    </>
  )
}

export default SaleInvoice
