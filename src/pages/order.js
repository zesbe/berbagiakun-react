import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";
import Head from "next/head";
import { Container, Card, Button, Table, Row, Col, Form } from "react-bootstrap";

export default function OrderPage() {
  const router = useRouter();
  const { product: slug } = router.query;
  const [product, setProduct] = useState(null);
  const [durasi, setDurasi] = useState(null);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data }) => {
        setProduct(data);
        // Otomatis pilih durasi pertama
        if (data?.durations?.length) setDurasi(data.durations[0].month);
        else setDurasi(1);
      });
  }, [slug]);

  if (!product) return (
    <Container className="py-5 text-center">
      <div className="spinner-border text-primary mb-2" />
      <p>Memuat produk...</p>
    </Container>
  );

  const hargaDipilih = product.durations?.find(d => d.month === durasi)?.price || product.base_price;

  return (
    <>
      <Head>
        <title>Order {product.name} - BerbagiAkun</title>
        <meta name="description" content={`Order ${product.name} di BerbagiAkun. Pilih durasi & harga, pembayaran mudah, notifikasi otomatis!`} />
      </Head>
      <div className="landing-bg py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={7} xs={12}>
              <Card className="shadow-lg border-0 mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <img src={product.image_url} alt={product.name} style={{maxHeight:70, maxWidth:110}} />
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
                  {/* ...form order, input WA, submit dsb di sini */}
                  <Button
                    size="lg"
                    className="w-100 mt-2"
                    style={{background:'#0d47a1'}}
                    // onClick={handleCheckout}
                  >
                    Lanjut Pembayaran
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
