import { supabase } from "../../lib/supabase";
import axios from "axios";
import { sendWA } from "../../lib/whatsapp";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  const { amount, order_id, status } = req.body;
  // Cek API Pakasir
  const apiKey = process.env.PAKASIR_API_KEY;
  const url = `https://pakasir.zone.id/api/transactiondetail?project=berbagiakun&amount=${amount}&order_id=${order_id}&api_key=${apiKey}`;
  const pakasir = await axios.get(url).then(r => r.data);
  if (!pakasir.transaction || pakasir.transaction.status !== "completed") return res.status(400).send("Not completed");

  // Update order
  const { data: order } = await supabase.from("orders").select("*").eq("order_id", order_id).single();
  if (!order) return res.status(404).send("Order not found");

  // Perpanjang akumulatif: expired_at baru = MAX(expired_at, now) + duration
  const expiredBase = order.expired_at && new Date(order.expired_at) > new Date() ? new Date(order.expired_at) : new Date();
  expiredBase.setMonth(expiredBase.getMonth() + order.duration);

  await supabase.from("orders").update({ status: "completed", expired_at: expiredBase }).eq("order_id", order_id);

  const { data: product } = await supabase.from("products").select("*").eq("id", order.product_id).single();
  if (product.type === "auto") {
    // Assign/generate akun
    const accountInfo = { username: "user@email.com", password: "autogenpw" };
    await supabase.from("orders").update({ account_info: accountInfo }).eq("order_id", order_id);
    await sendWA(order.user_wa, `Akun ${product.name} aktif!\nUsername: ${accountInfo.username}\nPassword: ${accountInfo.password}\nMasa aktif: s/d ${expiredBase.toISOString().slice(0,10)}\nDashboard: https://berbagiakun.com/dashboard`);
  } else {
    await sendWA(order.user_wa, `Order ${product.name} sedang diproses manual admin. Mohon tunggu info selanjutnya di WhatsApp.`);
    await sendWA(process.env.ADMIN_WA, `Order MANUAL masuk: ${product.name}, order_id: ${order_id}, WA: ${order.user_wa}`);
  }
  res.json({ ok: true });
}
