import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const [stat, setStat] = useState({ order: 0, product: 0 });
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("admin")) return router.push("/admin/login");
    Promise.all([
      supabase.from("orders").select("*"),
      supabase.from("products").select("*"),
    ]).then(([orderRes, productRes]) => {
      setStat({ order: orderRes.data.length, product: productRes.data.length });
    });
  }, []);

  return (
    <Container className="mt-5">
      <h3>Admin Dashboard</h3>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Order</Card.Title>
              <Card.Text className="display-4">{stat.order}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Produk</Card.Title>
              <Card.Text className="display-4">{stat.product}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
