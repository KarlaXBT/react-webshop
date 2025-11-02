import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import { useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  // useParams võtab sellest custom URList id väärtuse ja salvestab muutujasse
  const { id } = useParams();

  //otsime id põhjal õige toote mida kuvada, andmed võrdluseks tulevad .jsonist
  // parseInt selleks et useParams tagastab stringi, vaja teha täisarvuks
  const product = productsData.find((p) => p.id === parseInt(id));

  // funktsioon kontekstist et korvi lisada
  const { addToCart } = useContext(CartContext);

  // state koguse jaoks algselt 1
  const [quantity, setQuantity] = useState(1);

  // navigeerimiseks
  const navigate = useNavigate();

  // kui toodet ei leita siis kuvame selle teksti
  if (!product) {
    return <div className="text-center py-5">Product not found.</div>;
  }

  // funktsioon  carti lisamiseks kutsub callback funktsiooni kontekstist, lisab
  // objektile koguse property 1 või rohkem
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
            {/* miinus nupp setib koguse -1 math.max tagab et alla 1 ei saaks minna */}
            <Button
              variant="secondary"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </Button>

            {/* input koguse algväärtusega, kontrollitud input muutusel
            updateb setteriga kogust */}
            <Form.Control
              type="number"
              value={quantity}
              min="1"
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              className="mx-2 text-center"
            />
            {/* pluss nupp lisab kogusele +1 */}
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
