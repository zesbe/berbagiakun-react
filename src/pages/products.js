import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProductsPage() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setProduk(data || []));
  }, []);

  return (
    <>
      <Head>
        <title>Produk - BerbagiAkun</title>
        <meta name="description" content="Daftar produk akun streaming, software, gaming termurah. Pilih durasi, harga jelas, order otomatis." />
      </Head>
      <div className="landing-bg py-5">
        <Container>
          <h1 className="fw-bold mb-4 text-center" style={{color:'#0d47a1'}}>Daftar Produk</h1>
          <Row>
            {produk.length === 0 && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-2" />
                <p>Memuat produk...</p>
              </div>
            )}
            {produk.map(product => (
              <Col md={4} sm={6} xs={12} className="mb-4" key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
