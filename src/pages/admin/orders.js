import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { sendWA } from "../../lib/whatsapp";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [curOrder, setCurOrder] = useState({});
  const [form, setForm] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("admin")) return router.push("/admin/login");
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data } = await supabase.from("orders").select("*, products(*)").order("created_at", { ascending: false });
    setOrders(data);
  }

  function openModal(order = {}) {
    setCurOrder(order);
    setForm(order.account_info||{});
    setShow(true);
  }

  async function saveAkun(e) {
    e.preventDefault();
    await supabase.from("orders").update({ account_info: form }).eq("id", curOrder.id);
    // Kirim WA manual
    await sendWA(curOrder.user_wa, `Akun ${curOrder.products?.name} kamu sudah aktif!\nUsername: ${form.username}\nPassword: ${form.password}`);
    setShow(false);
    fetchOrders();
  }

  return (
    <Container className="mt-5">
      <h3>Manajemen Order</h3>
      <Table striped>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Produk</th>
            <th>Pemesan</th>
            <th>Status</th>
            <th>Masa Aktif</th>
            <th>Info Akun</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.order_id}</td>
              <td>{o.products?.name}</td>
              <td>{o.user_wa}</td>
              <td>{o.status}</td>
              <td>{o.expired_at||"-"}</td>
              <td>
                {o.account_info
                  ? <span>Sudah Dikirim</span>
                  : (o.status==="completed"&&o.products?.type==="manual"
                      ? <Button size="sm" onClick={() => openModal(o)}>Kirim Akun Manual</Button>
                      : "-")}
              </td>
              <td>
                {/* Bisa tambahkan hapus/cancel dsb */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Kirim Akun Manual</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveAkun}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control value={form.username||""} onChange={e=>setForm(f=>({...f,username:e.target.value}))} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control value={form.password||""} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required/>
            </Form.Group>
            <Button type="submit" className="mt-2">Kirim ke Customer</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
