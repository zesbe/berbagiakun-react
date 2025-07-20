import { supabase } from "./supabase";
import { sendWA } from "./whatsapp";

export async function remindExpiringOrders() {
  const now = new Date();
  for (let d of [3,2,1,0]) {
    const expiredDate = new Date(now);
    expiredDate.setDate(expiredDate.getDate()+d);
    const dateStr = expiredDate.toISOString().slice(0,10);

    const { data: orders } = await supabase
      .from("orders")
      .select("id,expired_at,user_wa,product_id,status")
      .eq("expired_at", dateStr)
      .eq("status", "completed");

    for (let order of orders || []) {
      const { data: product } = await supabase.from("products").select("name").eq("id", order.product_id).single();
      const linkPerpanjang = `https://berbagiakun.com/dashboard/orders?perpanjang=${order.id}`;
      await sendWA(order.user_wa, `Akun ${product.name} kamu akan expired dalam ${d} hari. Perpanjang: ${linkPerpanjang}`);
    }
  }
}
