import { Link } from "react-router-dom";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import RBNavbar from "react-bootstrap/Navbar";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <RBNavbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Brand / Logo */}
        <RBNavbar.Brand as={Link} to="/">
          PowerShop
        </RBNavbar.Brand>

        {/* Toggler for mobile */}
        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links */}
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            {/* Cart with badges */}
            <Nav.Link as={Link} to="/cart" className="position-relative">
              Cart
              {totalItems > 0 && (
                <>
                  {/* Item count badge */}
                  <span className="badge bg-primary rounded-pill ms-2">
                    {totalItems}
                  </span>
                </>
              )}
            </Nav.Link>

            {/* <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link> */}
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}

export default Navbar;
