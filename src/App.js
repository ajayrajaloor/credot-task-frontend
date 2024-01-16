import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AdminProduct from "./Pages/AdminProduct";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  useEffect(() => {
    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);
  return (
    <Routes>
      <Route path="/" exact element={<Home/>}/>
    <Route path="/admin" element={<AdminProduct addProduct={addProduct}/>} />
   </Routes>
  )
}