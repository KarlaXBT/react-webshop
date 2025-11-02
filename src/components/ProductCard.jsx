// Bootstrapi komponendid, neil on oma alamkompionendid nt card.title jne
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// product passitud propina, saame selle objekti andmeid kasutada iga kaardi jaoks
function ProductCard({ product }) {
  return (
    // kasutame ka bootstrapi klasse className "m-2" jne
    // ok kasutada inline stiile
    <Card className="m-2 shadow-sm" style={{ maxWidth: "18rem" }}>
      {/* teeme custom lingi useParamise jaoks kasutame template literali */}
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
