import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as A, Routes, Route } from "react-router-dom";
import SaleInvoice from "./Components/SaleInvoice";
import AddItem from "./Components/AddItem";
import Navigation from "./Components/Navigation";
import PurchaseCom from "./Components/PurchaseCom";



function App() {
  return (
    <>
      <A>
        <Navbar />
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saleinvoice" element={<SaleInvoice />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/purchase" element={<PurchaseCom />} />
          
          
        </Routes>
      </A>
    </>
  );
}

export default App;
