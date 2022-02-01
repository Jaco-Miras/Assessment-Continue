import React from "react";
import { Card, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Logo from "../../assets/LOGO.png";
import Banner from "../../assets/BANNER.jpg";

function Menu() {
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

      {/* Image */}
      <Container style={{ marginTop: "100px" }}>
        <Card>
          <Card.Body>
            <img src={Banner} alt="" />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Menu;
