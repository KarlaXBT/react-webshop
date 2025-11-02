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
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-content">
        {/* Routsid vaatavad URLi põhjal mis komponenti renderdada*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
