import Head from "next/head";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [produkUtama, setProdukUtama] = useState([]);
  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => setProdukUtama(data || []));
  }, []);
  return (
    <>
      <Head>
        <title>BerbagiAkun - Premium Account Sharing</title>
        <meta name="description" content="Beli akun streaming, software, dan gaming. Legal, pembayaran mudah, support WhatsApp, reminder expired otomatis." />
      </Head>
      {/* Hero Section */}
      <div className="landing-bg py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={7} xs={12} className="mb-4 mb-md-0">
              <motion.h1
                className="fw-bold"
                style={{ fontSize: "2.5rem" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Akun Premium <span style={{color:'#0d47a1'}}>100% Legal</span> & Hemat
              </motion.h1>
              <motion.p
                className="lead mt-3 mb-4"
                style={{fontWeight:400, color:'#23233a'}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Beli akun streaming, software, dan gaming dengan pembayaran mudah.<br/>
                Notifikasi WhatsApp otomatis, dashboard perpanjang, support CS 24 jam.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button size="lg" onClick={()=>router.push("/products")} className="me-2 mb-2 shadow-sm" style={{fontWeight:'bold',background:"#0d47a1",color:"#fff",border:'none'}}>Lihat Produk</Button>
                <Button size="lg" variant="outline-primary" onClick={()=>router.push("/login")} className="mb-2 shadow-sm">Login</Button>
              </motion.div>
            </Col>
            <Col md={5} xs={12}>
              <motion.img
                src="/images/hero-ilustration.svg"
                alt="Akun Streaming"
                className="img-fluid rounded shadow"
                style={{maxHeight:290}}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      {/* Produk Carousel Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="mb-4 text-center fw-bold">Favorit Bulan Ini</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Carousel
                interval={4000}
                fade
                indicators={false}
                controls={produkUtama.length > 1}
                className="shadow rounded"
              >
                {produkUtama.map(product => (
                  <Carousel.Item key={product.id}>
                    <div className="d-flex justify-content-center py-4">
                      <ProductCard product={product} />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Button size="lg" onClick={()=>router.push("/products")} style={{background:"#0d47a1",color:"#fff",border:'none'}}>Lihat Semua Produk</Button>
          </div>
        </Container>
      </section>
      {/* Animation Section */}
      <motion.section
        className="py-5"
        style={{background:'#fafbfc'}}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <h3 className="mb-3 text-center fw-semibold">Kenapa Pilih BerbagiAkun?</h3>
          <Row className="gy-3 justify-content-center">
            <Col xs={12} md={4}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <img src="/icons/whatsapp.svg" alt="" width={38} className="mb-2"/>
                  <h5 className="fw-bold">Notifikasi WhatsApp Otomatis</h5>
                  <p>Order, perpanjang, & reminder expired semua dikirim ke WhatsApp Anda tanpa delay.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <img src="/icons/supabase.svg" alt="" width={38} className="mb-2"/>
                  <h5 className="fw-bold">Dashboard Akun</h5>
                  <p>Cek masa aktif, info akun, dan perpanjang mudah dari 1 dashboard—anti ribet!</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <img src="/icons/shield.svg" alt="" width={38} className="mb-2"/>
                  <h5 className="fw-bold">Akun Legal & Support 24/7</h5>
                  <p>Produk 100% legal, uang kembali jika gagal, dan support CS ramah siap bantu.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </motion.section>
    </>
  );
}
