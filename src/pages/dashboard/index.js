import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";
import { Container, Table, Button, Badge, Spinner } from "react-bootstrap";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return router.push("/login");
      supabase.from("orders").select("*, products(*)").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => {
        setOrders(data || []);
        setLoading(false);
      });
    });
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner /></div>;

  return (
    <Container className="mt-5">
      <h3>Dashboard Customer</h3>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Produk</th>
            <th>Masa Aktif</th>
            <th>Status</th>
            <th>Info Akun</th>
            <th>Perpanjang</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>
            <tr key={order.id}>
              <td>{order.products?.name}</td>
              <td>
                {order.expired_at
                  ? <Badge bg={new Date(order.expired_at) < new Date() ? "danger" : "success"}>{order.expired_at}</Badge>
                  : "-"}
              </td>
              <td>{order.status}</td>
              <td>
                {order.account_info
                  ? <>
                    <div>User: {order.account_info.username}</div>
                    <div>Pass: {order.account_info.password}</div>
                  </>
                  : (order.status === "completed" && order.products?.type === "manual"
                      ? <span>Menunggu Admin</span>
                      : "-")}
              </td>
              <td>
                <Button size="sm" onClick={() => router.push(`/order?product=${order.products?.slug}`)}>Perpanjang</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
