import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function CartSummary() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="card p-4">
      <h4 className="mb-3">Order Summary</h4>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between mb-2">
              <div>
                {item.name} x {item.quantity}
              </div>
              <div>{(item.price * item.quantity).toFixed(2)}€</div>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>{total.toFixed(2)}€</span>
          </div>
        </>
      )}
    </div>
  );
}

export default CartSummary;
