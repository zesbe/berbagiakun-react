import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function BroadcastWA() {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function send(e) {
    e.preventDefault();
    setSending(true);
    // Ambil nomor WA pelanggan aktif
    const { data } = await supabase.from("orders").select("user_wa").eq("status","completed");
    const numbers = [...new Set(data.map(o=>o.user_wa))];
    const res = await fetch("/api/send-bulk-wa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbers, message: msg })
    }).then(r=>r.json());
    if (res.ok) setResult("Broadcast selesai!");
    else setError(res.error);
    setSending(false);
  }

  return (
    <Container className="mt-5" style={{maxWidth:600}}>
      <h3>Broadcast WhatsApp</h3>
      {result && <Alert variant="success">{result}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={send}>
        <Form.Group>
          <Form.Label>Pesan</Form.Label>
          <Form.Control as="textarea" rows={4} value={msg} onChange={e=>setMsg(e.target.value)} required/>
        </Form.Group>
        <Button type="submit" className="mt-2" disabled={sending}>{sending ? "Mengirim..." : "Broadcast"}</Button>
      </Form>
    </Container>
  );
}
