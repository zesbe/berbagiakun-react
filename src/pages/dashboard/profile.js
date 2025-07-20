import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Profile() {
  const [user, setUser] = useState({});
  const [wa, setWa] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return router.push("/login");
      setUser(user);
      setWa(user.user_metadata?.wa || "");
      setEmail(user.email || "");
    });
  }, []);

  async function save(e) {
    e.preventDefault();
    const updates = {};
    if (wa !== user.user_metadata?.wa) updates.wa = wa;
    if (email !== user.email) updates.email = email;
    const { error } = await supabase.auth.updateUser({ email, data: { wa } });
    setMsg(error ? error.message : "Profil diperbarui");
  }

  return (
    <Container className="mt-5" style={{maxWidth:400}}>
      <h3>Edit Profil</h3>
      {msg && <Alert variant="info">{msg}</Alert>}
      <Form onSubmit={save}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>No WhatsApp</Form.Label>
          <Form.Control value={wa} onChange={e=>setWa(e.target.value)} required />
        </Form.Group>
        <Button type="submit" className="mt-2">Simpan</Button>
      </Form>
    </Container>
  );
}
