// imports - different "stuff" we are using in App component
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// App component always gets rendered
function App() {
  return (
    <div className="app-container">
      {/* navbar and footer always show */}
      <Navbar />

      <main className="app-content">
        {/* Routes are special component, checks what component to render based on url */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
