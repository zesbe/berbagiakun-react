import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function Register() {
  const [email, setEmail] = useState("");
  const [wa, setWa] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function register(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { wa } },
    });
    if (error) setError(error.message);
    else {
      setSuccess("Registrasi berhasil! Silakan cek email untuk verifikasi.");
      setTimeout(()=>router.push("/login"),1500);
    }
  }
  return (
    <Container style={{maxWidth:400}} className="mt-4">
      <h3>Register</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={register}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>No WhatsApp</Form.Label>
          <Form.Control value={wa} onChange={e=>setWa(e.target.value)} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        </Form.Group>
        <Button type="submit" className="mt-2">Register</Button>
      </Form>
    </Container>
  );
}
