import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Table,
} from "react-bootstrap";
import Logo from "../../assets/LOGO.png";
import { db } from "../../firebase";
import ordersServices from "../../services/orders.services";
import OrderDataService from "../../services/orders.services";

function ViewOrder() {
  const [date, setDate] = useState();
  const [orders, setOrders] = useState([]);
  const [cusName, setCusName] = useState("");
  const [orderType, setOrderType] = useState();
  const [cusAdd, setCusAdd] = useState("");
  const [foodItem, setFoodItem] = useState();
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(50);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [smShow, setSmShow] = useState(false);

  useEffect(() => {
    getOrder();
  }, []);

  //Read
  const getOrder = async () => {
    const data = await OrderDataService.getAllOrders();
    console.log(data.docs);
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //Update
  const editHandler = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "orders", selectedOrder.id);

    await updateDoc(docRef, {
      date,
      cusName,
      orderType,
      cusAdd,
      foodItem,
      total,
      quantity,
      price,
      total: quantity * price,
    });
    setSmShow(false);
    setSelectedOrder(null);
    alert("Order Updated");
    window.location.reload();
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

      {/* Table */}
      <h2 className="m-4">Order Details</h2>
      <Container className="mt-4 m-4">
        <Table striped bordered hover responsive="xl">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Order Type</th>
              <th>Customer Address</th>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{doc.date}</td>
                  <td>{doc.cusName}</td>
                  <td>{doc.orderType}</td>
                  <td>{doc.cusAdd}</td>
                  <td>{doc.foodItem}</td>
                  <td>{doc.quantity}</td>
                  <td>{doc.price}</td>
                  <td>{doc.total}</td>
                  <td style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setSmShow(true);
                        setSelectedOrder(doc);
                        setCusName(doc.cusName);
                        setCusAdd(doc.cusAdd);
                        setFoodItem(doc.foodItem);
                        setQuantity(doc.quantity);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      {/* End of Table */}

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

          <Container>
            <Form onSubmit={editHandler}>
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
                <Form.Label>Total Amount</Form.Label>
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

          <Button onClick={editHandler} variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Body>
      </Modal>
      {/* End of Modal */}
    </>
  );
}

export default ViewOrder;
