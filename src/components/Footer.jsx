import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>PowerShop</h5>
            <p>Your trusted store for quality gear.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-light text-decoration-none">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-light text-decoration-none">
                  Admin
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>support@powershop.com</p>
          </Col>
        </Row>
        <hr />
        <p className="text-center mb-0">
          © 2025 PowerShop. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
