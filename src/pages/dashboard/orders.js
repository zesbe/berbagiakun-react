import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";
import { Container, Table, Button, Badge } from "react-bootstrap";

export default function OrdersHistory() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return router.push("/login");
      supabase.from("orders").select("*, products(*)").eq("user_id", user.id).order("created_at", { ascending: false })
        .then(({ data }) => setOrders(data || []));
    });
  }, []);

  function handleRenew(order) {
    router.push(`/order?product=${order.products.slug}`);
  }

  return (
    <Container className="mt-4">
      <h4>Histori Order & Perpanjang</h4>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Produk</th>
            <th>Tanggal Order</th>
            <th>Masa Aktif</th>
            <th>Status</th>
            <th>Perpanjang</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>
            <tr key={order.id}>
              <td>{order.products?.name}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>
                {order.expired_at
                  ? <Badge bg={new Date(order.expired_at) < new Date() ? "danger" : "success"}>{order.expired_at}</Badge>
                  : "-"}
              </td>
              <td>{order.status}</td>
              <td>
                <Button size="sm" variant="outline-primary" onClick={() => handleRenew(order)}>Perpanjang</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
