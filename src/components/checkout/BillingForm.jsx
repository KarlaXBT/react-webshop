import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";

function BillingForm({ onSubmit }) {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [selectedLocker, setSelectedLocker] = useState("");
  const [pakiautomaadid, setPakiautomaadid] = useState([]);
  const [dbPakiautomaadid, setDbPakiautomaadid] = useState([]);
  const [riik, setRiik] = useState("EE");

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then((res) => res.json())
      .then((data) => {
        setPakiautomaadid(data);
        setDbPakiautomaadid(data);
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const otsi = (term) => {
    const filtered = dbPakiautomaadid.filter((a) =>
      a.NAME.toLowerCase().includes(term.toLowerCase())
    );
    setPakiautomaadid(filtered);
  };

  return (
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

      {/* Pickup Locker */}
      <div className="mb-3">
        <label className="form-label">Select Pickup Location</label>
        <div className="mb-2">
          {["EE", "LV", "LT"].map((c) => (
            <button
              key={c}
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => setRiik(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search locker..."
          className="form-control mb-2"
          onChange={(e) => otsi(e.target.value)}
        />
        <select
          className="form-select"
          value={selectedLocker || ""}
          onChange={(e) => setSelectedLocker(e.target.value)}
        >
          <option value="">Select a locker</option>
          {pakiautomaadid
            .filter((a) => a.A0_NAME === riik)
            .map((a) => (
              <option key={a.ZIP} value={a.NAME}>
                {a.NAME}
              </option>
            ))}
        </select>
      </div>

      <button
        className="btn btn-success w-100 mt-3"
        onClick={() => onSubmit(form, selectedLocker)}
        disabled={cart.length === 0}
      >
        Confirm Payment
      </button>
    </div>
  );
}

export default BillingForm;
