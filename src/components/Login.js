import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle, uiConfig, auth } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          {error && <Alert variant="danger">{error}</Alert>}
          {/* <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button type="submit" className="w-100" disabled={loading}>
              Log In
            </Button>
          </Form>
          <div className="login-buttons">
            <button
              className="login-provider-button"
              onClick={signInWithGoogle}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
                alt="google icon"
              />
              <span> Continue with Google</span>
            </button>
          </div>
          ui: */}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt2">
        Need an account? <Link to="/signup">Create one</Link>
      </div>
    </div>
  );
}
