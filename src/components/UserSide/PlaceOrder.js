import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import Logo from "../../assets/LOGO.png";
import OrderDataService from "../../services/orders.services";

function PlaceOrder() {
  const [smShow, setSmShow] = useState();

  const [date, setDate] = useState();
  const [cusName, setCusName] = useState("");
  const [orderType, setOrderType] = useState("Delivery");
  const [cusAdd, setCusAdd] = useState("");
  const [foodItem, setFoodItem] = useState("Garlic Chicken");
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(50);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setMessage("");

    if (
      (date === "" ||
        cusName === "" ||
        orderType === "" ||
        cusAdd === "" ||
        total === "",
      foodItem === "" || quantity === "" || price === "")
    ) {
      setMessage({ error: true, msg: "All files are mandatory" });
      return;
    }

    const newOrder = {
      date,
      cusName,
      orderType,
      cusAdd,
      foodItem,
      quantity,
      price,
      total: quantity * price,
    };
    console.log(newOrder);

    try {
      await OrderDataService.addOrders(newOrder);
      setMessage({ error: false, msg: "New Order Added Successfully" });
      window.location.reload("/vieworder");
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setDate("");
    setCusName("");
    setOrderType("");
    setCusAdd("");
    setFoodItem("");
    setQuantity("");
    setPrice("");
    setTotal("");
  };

  return (
    <>
      {/* Start of Navigation */}
      <Navbar bg="primary" expand="lg">
        <Container style={{ fontWeight: 500, color: "white" }}>
          <img src={Logo} alt="Logo" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/menu">Menu</Nav.Link>
              <Nav.Link href="/techstack">Tech Stack</Nav.Link>

              <NavDropdown title="Order here" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/placeorder">
                  Place Order
                </NavDropdown.Item>
                <NavDropdown.Item href="/vieworder">
                  View Order
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>

            <Nav className="justify-content-end">
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* End of Navigation */}

      {/* Start of Code */}
      <Container
        className="align-items-center justify-content-center mt-5"
        style={{ paddingTop: "100px" }}
      >
        <Card>
          <Card.Body>Garlic Chicken</Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Button size="md" onClick={() => setSmShow(true)}>
              Place Order
            </Button>
          </Card.Body>
        </Card>
      </Container>

      {/* Start of Modal */}
      <Modal
        size="mb"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Add Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Start of Form */}
          {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
            ></Alert>
          )}
          <Container>
            <Form onSubmit={handleSubmitOrder}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Customer Name"
                  value={cusName}
                  onChange={(e) => setCusName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Order Type</Form.Label>
                <br />
                <Form.Text className="text-muted">Please Select One</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Delivery"
                  onChange={(e) => setOrderType("Delivery")}
                  checked={orderType === "Delivery"}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Pick Up"
                  onChange={(e) => setOrderType("Pickup")}
                  checked={orderType === "Pickup"}
                />
              </Form.Group>

              <Form.Text className="text-muted">
                If Delivery, Please Fill Out
              </Form.Text>

              <Form.Group className="mb-3">
                <Form.Label>Customer Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Customer Address"
                  value={cusAdd}
                  onChange={(e) => setCusAdd(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Container>
          {/* End of Form */}

          {/* Start of Order Details */}
          <Container>
            <Modal.Title>Order Details</Modal.Title>
            <Form.Group className="mb-3">
              <Form.Label>Food Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Food Item"
                value={foodItem}
                onChange={(e) => setFoodItem(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Form.Group className="mb-3">
                <Col xs={6}>
                  <InputGroup className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <InputGroup.Text>₱</InputGroup.Text>
                    <Form.Control
                      disabled
                      aria-label="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <InputGroup className="mb-3">
                <Form.Label>Total</Form.Label>
                <InputGroup.Text>₱</InputGroup.Text>
                <Form.Control
                  disabled
                  aria-label="Price"
                  value={quantity * price}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Container>
          {/* End of Order Details */}

          <Button onClick={handleSubmitOrder} variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Body>
      </Modal>
      {/* End of Modal */}
      {/* End of Code */}
    </>
  );
}

export default PlaceOrder;
