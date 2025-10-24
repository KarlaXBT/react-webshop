import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
// use whatever name for bootstrap component import
import RBNavbar from "react-bootstrap/Navbar";
function Navbar() {
  return (
    <RBNavbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* brand and logo */}
        <RBNavbar.Brand as={Link} to="/">
          PowerShop
        </RBNavbar.Brand>

        {/* Toggler for mobile view */}
        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible links */}
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}

export default Navbar;
