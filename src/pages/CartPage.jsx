import { useContext } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  // destruktureeritud asjad mis kontekstist saame, et siin komponendis kasutada
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const navigate = useNavigate();

  // reduceme cart arrayst kõikide objektide kogusumma
  // const totalPrice = cart.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  // funktsioonid et suurendada ja vähendada toodete koguseid, noolefunktsioonid
  const increment = (item) => addToCart({ ...item, quantity: 1 });
  const decrement = (item) => {
    if (item.quantity > 1) addToCart({ ...item, quantity: -1 });
    else removeFromCart(item.id);
  };

  return (
    <Container className="py-5 flex-grow-1">
      <h1 className="mb-4">Your Shopping Cart</h1>

      {/* kontrollime kas cart arrays on midagi, kui ei ole siis kuvame selle paragraafi, vastasel juhul mapime cart itemid */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <Row
              key={item.id}
              className="align-items-center mb-3 p-3 border rounded flex-wrap"
            >
              <Col xs={12} md={2} className="text-center mb-2 mb-md-0">
                <Image src={item.image} fluid rounded />
              </Col>
              <Col xs={12} md={4}>
                <h5>{item.name}</h5>
                <p>${item.price.toFixed(2)}</p>
              </Col>
              <Col
                xs={12}
                md={3}
                className="d-flex align-items-center mb-2 mb-md-0"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => decrement(item)}
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => increment(item)}
                >
                  +
                </Button>
              </Col>
              <Col xs={12} md={2}>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </Col>
              <Col xs={12} md={1} className="text-center">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          <Row className="mt-4 justify-content-end">
            <Col
              xs={12}
              md={4}
              className="text-end d-flex flex-column flex-sm-row justify-content-end gap-2"
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/products")}
              >
                Back to Products
              </Button>
              <Button
                variant="success"
                size="lg"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default CartPage;
