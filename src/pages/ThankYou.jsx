import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="container my-5">
      <div className="card p-5 text-center">
        <h2 className="mb-3">Thank You!</h2>
        <p className="lead mb-4">
          Your order has been successfully received. We will contact you shortly
          with the details.
        </p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
