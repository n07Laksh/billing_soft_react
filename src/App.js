import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as A, Routes, Route } from "react-router-dom";
import SaleInvoice from "./Components/SaleInvoice";
import AddItem from "./Components/AddItem";



function App() {
  return (
    <>
      <A>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saleinvoice" element={<SaleInvoice />} />
          <Route path="/addItem" element={<AddItem />} />
        </Routes>
      </A>
    </>
  );
}

export default App;
