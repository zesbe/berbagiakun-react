import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";
import { Form, Button, Alert, Container } from "react-bootstrap";

export default function AdminLogin() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState(""); const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    // Ambil admin dari table admin_users
    const { data: admin } = await supabase.from("admin_users").select("*").eq("email", email).single();
    if (!admin || admin.password !== password) return setError("Email/password salah");
    // Simpan login status (misal: localStorage/session, idealnya pakai JWT, tapi ini minimal working)
    localStorage.setItem("admin", email);
    router.push('/admin/dashboard');
  }
  return (
    <Container className="mt-5" style={{maxWidth:400}}>
      <h3>Login Admin</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-2"><Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></Form.Group>
        <Form.Group className="mb-2"><Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}
