import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }).then(r=>r.json());
    if (res.ok) setMsg("Link reset password sudah dikirim ke email Anda.");
    else setErr(res.error || "Gagal");
  }
  return (
    <Container className="mt-5" style={{maxWidth:400}}>
      <h3>Reset Password</h3>
      {msg && <Alert variant="success">{msg}</Alert>}
      {err && <Alert variant="danger">{err}</Alert>}
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </Form.Group>
        <Button type="submit" className="mt-2">Kirim Link</Button>
      </Form>
    </Container>
  );
}
