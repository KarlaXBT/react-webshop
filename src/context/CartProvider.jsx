import { useState } from "react";
import { CartContext } from "./CartContext";

function CartProvider({ children }) {
  // state et hoida korvi datat
  const [cart, setCart] = useState([]);

  // saab väljast poolt product objekti
  function addToCart(product) {
    // konstant et kontrollida kas selline asi on juba korvis olemas, annab booleani
    const exists = cart.find((item) => item.id === product.id);

    // kontrollime kas selline asi on korvis, kui jah siis uuendame objektis hulka kui ei siis lisame  selle asja
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }
  // et eemaldada toode ostukorvist
  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
