import { useParams } from "react-router-dom";
import productsData from "../data/products.json";
import { Container, Row, Col, Button } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-5">Product not found.</div>;
  }
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center">
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
          <Button variant="success" size="lg">
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
