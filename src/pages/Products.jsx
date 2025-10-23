import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState(productsData);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Our Products</h2>

      <Row>
        {products.map((product) => (
          <Col
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
