import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { useRouter } from "next/router";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("admin")) return router.push("/admin/login");
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data);
  }

  function openModal(prod = {}) {
    setForm(prod);
    setShow(true);
  }

  async function saveProduct(e) {
    e.preventDefault();
    if (form.id) {
      await supabase.from("products").update(form).eq("id", form.id);
    } else {
      await supabase.from("products").insert([form]);
    }
    setShow(false);
    fetchProducts();
  }

  async function deleteProduct(id) {
    if (!confirm("Hapus produk?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  return (
    <Container className="mt-5">
      <h3>Produk</h3>
      <Button className="mb-2" onClick={() => openModal({})}>Tambah Produk</Button>
      <Table striped>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Type</th>
            <th>Harga Dasar</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.type}</td>
              <td>{p.base_price}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => openModal(p)}>Edit</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => deleteProduct(p.id)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Produk</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveProduct}>
            <Form.Group>
              <Form.Label>Nama</Form.Label>
              <Form.Control value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Kategori</Form.Label>
              <Form.Control value={form.category||""} onChange={e=>setForm(f=>({...f,category:e.target.value}))} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select value={form.type||""} onChange={e=>setForm(f=>({...f,type:e.target.value}))} required>
                <option value="auto">Auto</option>
                <option value="manual">Manual</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Harga Dasar</Form.Label>
              <Form.Control type="number" value={form.base_price||""} onChange={e=>setForm(f=>({...f,base_price:Number(e.target.value)}))} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Slug</Form.Label>
              <Form.Control value={form.slug||""} onChange={e=>setForm(f=>({...f,slug:e.target.value}))} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>URL Gambar</Form.Label>
              <Form.Control value={form.image_url||""} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))} required/>
            </Form.Group>
            <Button type="submit" className="mt-2">Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
