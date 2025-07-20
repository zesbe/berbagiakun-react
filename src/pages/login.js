import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/dashboard");
  }
  return (
    <Container style={{maxWidth:400}} className="mt-4">
      <h3>Login Customer</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        </Form.Group>
        <Button type="submit" className="mt-2">Login</Button>
      </Form>
    </Container>
  );
}
