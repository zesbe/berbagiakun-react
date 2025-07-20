import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Head from "next/head";
import { Container, Card, Button, Row, Col, Form, Alert } from "react-bootstrap";

export default function ProductDetailOrder() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [durasi, setDurasi] = useState(null);
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [processing, setProcessing] = useState(false);
  const [notif, setNotif] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data }) => {
        setProduct(data);
        if (data?.durations?.length) setDurasi(data.durations[0].month);
        else setDurasi(1);
      });
  }, [slug]);

  if (!product) return (
    <Container className="py-5 text-center">
      <div className="spinner-border text-primary mb-2" />
      <p>Memuat detail produk...</p>
    </Container>
  );

  const hargaDipilih = product.durations?.find(d => d.month === durasi)?.price || product.base_price;

  async function handleOrder(e) {
    e.preventDefault();
    setProcessing(true);

    if (!nama || !wa) {
      setNotif({ show: true, message: "Isi nama & nomor WhatsApp!", variant: "danger" });
      setProcessing(false);
      return;
    }

    // 1. Insert order ke Supabase
    const { data, error } = await supabase.from("orders").insert([{
      product_id: product.id,
      product_name: product.name,
      duration_month: durasi,
      price: hargaDipilih,
      nama,
      whatsapp: wa,
      status: "pending"
    }]).select(); // <-- select() agar data[0].id terisi

    setProcessing(false);

    if (error || !data || !data[0]?.id) {
      setNotif({ show: true, message: "Gagal membuat order. " + (error?.message||''), variant: "danger" });
    } else {
      // 2. Redirect ke Pakasir
      const order_id = `ORD${data[0].id}`; // contoh: ORD123, pastikan unik (atau pakai id saja)
      const amount = hargaDipilih;
      const url = `https://pakasir.zone.id/pay/berbagiakun/${amount}?order_id=${order_id}&redirect=https://berbagiakun.com/invoices`;

      // 3. Update order_id di orders table jika mau (opsional, biar nyambung ke invoice dll)
      await supabase.from("orders").update({ order_id }).eq("id", data[0].id);

      // 4. Redirect user ke pembayaran Pakasir
      window.location.href = url;
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} - BerbagiAkun</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="landing-bg py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={7} xs={12}>
              <Card className="shadow-lg border-0 mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <img src={product.image_url} alt={product.name} style={{maxHeight:80, maxWidth:120}} />
                  </div>
                  <h2 className="fw-bold text-center mb-2">{product.name}</h2>
                  <p className="text-center">{product.description}</p>
                  <div className="mb-3 text-center">
                    <span className="badge bg-secondary me-1">{product.category}</span>
                    <span className={`badge ${product.type === "auto" ? "bg-success" : "bg-warning"}`}>
                      {product.type === "auto" ? "Auto" : "Manual"}
                    </span>
                  </div>
                  <h5 className="mb-2 fw-semibold text-primary text-center">Pilih Durasi & Harga</h5>
                  <Form.Group>
                    <Form.Select
                      value={durasi}
                      onChange={e => setDurasi(Number(e.target.value))}
                      className="mb-3"
                    >
                      {(product.durations || [{month:1,price:product.base_price}]).map((d, idx) => (
                        <option value={d.month} key={idx}>
                          {d.month} Bulan — Rp{d.price.toLocaleString()}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <div className="text-center mb-3">
                    <span className="fs-5 fw-bold text-primary">
                      Total: Rp{hargaDipilih.toLocaleString()}
                    </span>
                  </div>
                  {notif.show &&
                    <Alert variant={notif.variant} onClose={()=>setNotif({...notif, show:false})} dismissible>
                      {notif.message}
                    </Alert>
                  }
                  <Form onSubmit={handleOrder}>
                    <Form.Group className="mb-2">
                      <Form.Label>Nama Pemesan</Form.Label>
                      <Form.Control
                        value={nama}
                        onChange={e => setNama(e.target.value)}
                        required
                        placeholder="Nama kamu"
                        autoComplete="name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nomor WhatsApp</Form.Label>
                      <Form.Control
                        value={wa}
                        onChange={e => setWa(e.target.value)}
                        required
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        autoComplete="tel"
                      />
                    </Form.Group>
                    <Button
                      size="lg"
                      className="w-100 mt-2"
                      style={{background:'#0d47a1'}}
                      type="submit"
                      disabled={processing}
                    >
                      {processing ? "Memproses..." : "Lanjut Pembayaran"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
