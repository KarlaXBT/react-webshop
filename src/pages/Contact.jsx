import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  const locations = [
    { name: "Ülemiste keskus", coords: [58.061, 27.056], hours: "9-22" },
    // Add more locations if needed
  ];

  return (
    <Container className="my-5">
      <h2 className="mb-4">Contact Us</h2>
      <Row>
        {/* Left: Contact Form */}
        <Col md={6} className="mb-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Send Message
            </Button>
          </Form>
        </Col>

        {/* Right: Map */}
        <Col md={6}>
          <MapContainer
            center={[58.061, 27.056]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, idx) => (
              <Marker key={idx} position={loc.coords}>
                <Popup>
                  {loc.name} <br /> Avatud kell {loc.hours}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
