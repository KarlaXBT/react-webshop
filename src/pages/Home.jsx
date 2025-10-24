import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-hero">
      <Container className="hero-content">
        <h1 className="hero-title">Welcome to PowerShop</h1>
        <p className="hero-subtitle">
          Discover top-quality products tailored for you.
        </p>
        <Button
          as={Link}
          to="/products"
          variant="light"
          size="lg"
          className="hero-button"
        >
          Shop Now
        </Button>
      </Container>
    </section>
  );
}

export default Home;
