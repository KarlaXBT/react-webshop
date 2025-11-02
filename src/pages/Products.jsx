import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

//
function Products() {
  // products muutuja, algsed andmed tulevad kohalikust "andmebaasist",  lihtsalt .json fail
  const [products] = useState(productsData);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Our Products</h2>
      {/* mapime kõik andmed bootstrapi kaartideks alg andmed tulevad JSON failist */}
      <Row>
        {products.map((product) => (
          <Col
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center"
          >
            {/* passime igale ProductCard komponendile objekti */}
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
