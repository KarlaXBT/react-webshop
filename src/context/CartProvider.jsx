import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

// children on spets keyword, selle väärtuseks saab kõik mis on mässitud CartProvider komponendi sisse
function CartProvider({ children }) {
  // state et hoida ja uuendada korvi datat, vaatame kas on localstorages
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // salvestame localstoragesse iga kord kui cart muutub
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // saab väljast poolt product objekti
  function addToCart(product) {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);

      if (exists) {
        toast.info("Updated item quantity");
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        toast.success("Added to cart!");
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
  }
  // et eemaldada toode ostukorvist
  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
    toast.error("Removed from cart");
  }
  return (
    // mehhanism et jagada neid  asju alamkomponentidele
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
