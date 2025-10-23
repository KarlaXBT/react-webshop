// these bootstrap components have sub-components like Card.Body etc
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// product passed as prop, is object that has data for every card
function ProductCard({ product }) {
  return (
    // uses bootstrap classes ex. m-2 for margin, variant is bootstrap prop,
    // ok to use inline styles
    <Card className="m-2 shadow-sm" style={{ maxWidth: "18rem" }}>
      <Link
        to={`/product/${product.id}`}
        className="text-decoration-none text-dark"
      >
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text className="text-muted small">
            {product.description}
          </Card.Text>
          <Card.Text className="fw-bold">{product.price} €</Card.Text>
        </Card.Body>
      </Link>

      <Card.Footer className="bg-transparent border-0 text-center">
        <Link to={`/product/${product.id}`}>
          <Button variant="primary" size="sm">
            View Details
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
