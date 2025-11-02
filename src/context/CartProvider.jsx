import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

// children on spets keyword, selle väärtuseks saab kõik mis on mässitud CartProvider komponendi sisse, hetkel siis App komponent
function CartProvider({ children }) {
  // state et hoida ja uuendada korvi datat, vaatame kas alguses on localstorages midagi
  const [cart, setCart] = useState(() => {
    // võtame localStoragest väärtused salvestame consti
    const savedCart = localStorage.getItem("cart");
    // kui truthy siis parseme  ning paneme state väärtuseks, kui falsy siis  on väärtuseks tühi array
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // salvestame localstoragesse iga kord kui cart muutub, useEffect hookiga,
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // funktsiooni kutsudes saab väljast poolt product objekti
  function addToCart(product) {
    // uuendame  korvi state callback funktsiooniga
    // kontrollib kas eelnevalt on antud toode juba olemas, returnib booleani
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);

      // kui toode on ole,mas siis toasti notification
      if (exists) {
        toast.info("Updated item quantity");
        // mappime eelneva array, otsime id võrdlusega õige toote  ja liidame varasema koguse või + 1
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
        // kui toodet ei ole siis lisame, eelnevalt spreadime array lisame objekti mille ka alguses spreadime ja sätime koguse 1 peale
      } else {
        toast.success("Added to cart!");
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
  }
  // et eemaldada toode ostukorvist, kasutame filter meetodit konditsiooniks on et kui item.id ei ole võrne idga siis true ja pannakse uude arraysse, kui on jäetakse välja
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
