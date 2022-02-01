import React, { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

function LogIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError("Wrong Credentials");
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center mt-4">
        <div className="w-50" style={{ maxWidth: "100%" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Label>Email:</Form.Label>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Label>Password:</Form.Label>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Enter Email"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit">Submit</Button>
                <div className="p-4 box mt-3 text-center">
                  Don't have an Account? <Link to="/signup">Sign Up</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default LogIn;
