import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Table,
} from "react-bootstrap";
import Logo from "../assets/LOGO.png";
import OrderDataService from "../services/orders.services";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function HomeAdmin() {
  useEffect(() => {
    getOrder();
  }, []);

  //Read
  const getOrder = async () => {
    const data = await OrderDataService.getAllOrders();
    console.log(data.docs);
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const [orders, setOrders] = useState([]);

  const deleteOrder = async (order) => {
    await deleteDoc(doc(db, "orders", order));
    alert("Order Deleted!");
    window.location.reload();
  };

  const orderSuccess = async (order) => {
    const docRef = doc(db, "orders", order);

    await updateDoc(docRef, {
      status: "done",
    });
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
            <Nav className="me-auto"></Nav>

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
                      onClick={() => orderSuccess(doc.id)}
                      disabled={doc.status === "done"}
                    >
                      Done
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => deleteOrder(doc.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      {/* End of Table */}
    </>
  );
}

export default HomeAdmin;
