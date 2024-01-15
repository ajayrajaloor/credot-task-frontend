import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AdminProduct from "./Pages/AdminProduct";
import { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
    <Route path="/admin" element={<AdminProduct addProduct={addProduct}/>} />
   </Routes>
  )
}