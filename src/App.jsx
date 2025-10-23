import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
