import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import { useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  if (!product) {
    return <div className="text-center py-5">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center mb-4 mb-md-0">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="fw-bold mb-4">{product.price} €</h4>

          {/* Quantity Selector */}
          <Form
            className="d-flex align-items-center mb-3"
            style={{ maxWidth: "200px" }}
          >
            <Button
              variant="secondary"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </Button>
            <Form.Control
              type="number"
              value={quantity}
              min="1"
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              className="mx-2 text-center"
            />
            <Button
              variant="secondary"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </Form>

          {/* Action Buttons */}
          <div className="d-flex flex-wrap gap-2">
            <Button variant="success" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
