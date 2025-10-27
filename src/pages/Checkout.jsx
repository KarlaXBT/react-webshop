import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);

  // Billing form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Pickup lockers state
  const [selectedLocker, setSelectedLocker] = useState("");
  const [pakiautomaadid, setPakiautomaadid] = useState([]);

  // Fetch lockers
  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then((res) => res.json())
      .then((data) => setPakiautomaadid(data))
      .catch((err) => console.error("Error fetching lockers:", err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!form.name || !form.email || !form.address) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!selectedLocker) {
      toast.error("Please select a pickup location");
      return;
    }

    const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";

    const payload = {
      account_name: "EUR3D1",
      nonce: "asdsad" + Math.random() + new Date(),
      timestamp: new Date(),
      amount: total, // demo API seems to accept number
      order_reference: "order" + Math.floor(Math.random() * 999),
      customer_url: "https://example.com", // your local dev port
      api_username: "e36eb40f5ec87fa2",
      customer_email: form.email,
      customer_name: form.name,
      pickup_location: selectedLocker,
    };

    const options = {
      method: "POST",
      headers: {
        Authorization:
          "Basic ZTM2ZWI0MGY1ZWM4N2ZhMjo3YjkxYTNiOWUxYjc0NTI0YzJlOWZjMjgyZjhhYzhjZA==",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    toast.info("Processing payment...");

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("Payment API response:", json);
        const paymentLink =
          json.payment_link || "http://localhost:5174/thankyou";
        // Clear cart before redirect
        setCart([]);
        localStorage.removeItem("cart");
        window.location.href = paymentLink;
      })
      .catch((err) => {
        console.error("Payment error:", err);
        toast.error("Payment failed. Redirecting to thank you page.");
        window.location.href = "http://localhost:5174/thankyou";
      });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        {/* Left: Billing + Pickup */}
        <div className="col-md-6">
          <div className="card p-4 mb-4">
            <h4 className="mb-3">Billing Information</h4>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* Pickup locker */}
            <div className="mb-3">
              <label className="form-label">Select Pickup Location</label>
              <select
                className="form-select"
                value={selectedLocker || ""}
                onChange={(e) => setSelectedLocker(e.target.value)}
              >
                <option value="">Select a locker</option>
                {pakiautomaadid.map((a) => (
                  <option key={a.ZIP} value={a.NAME}>
                    {a.NAME}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={handlePayment}
              disabled={cart.length === 0}
            >
              Confirm Payment
            </button>
          </div>
        </div>

        {/* Right: Cart Summary */}
        <div className="col-md-6">
          <div className="card p-4">
            <h4 className="mb-3">Order Summary</h4>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between mb-2"
                  >
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
        </div>
      </div>
    </div>
  );
}

export default Checkout;
