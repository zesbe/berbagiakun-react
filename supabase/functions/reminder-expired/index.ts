import { createClient } from 'https://esm.sh/@supabase/supabase-js'
const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"))

const REMIND_DAYS = [3, 2, 1, 0]
const WAPANEL_URL = 'https://app.wapanels.com/api/create-message'
const APPKEY = Deno.env.get("WAPANELS_APPKEY")
const AUTHKEY = Deno.env.get("WAPANELS_AUTHKEY")

async function sendWA(to: string, message: string) {
  const formData = new FormData()
  formData.append("appkey", APPKEY)
  formData.append("authkey", AUTHKEY)
  formData.append("to", to)
  formData.append("message", message)
  await fetch(WAPANEL_URL, { method: 'POST', body: formData })
}

Deno.serve(async (_req) => {
  const today = new Date()
  for (let days of REMIND_DAYS) {
    const checkDate = new Date(today)
    checkDate.setDate(checkDate.getDate() + days)
    const expired = checkDate.toISOString().slice(0, 10)
    const { data: orders } = await supabase
      .from('orders')
      .select('id, expired_at, user_wa, product_id, status')
      .eq('expired_at', expired)
      .eq('status', 'completed')
    if (orders) {
      for (const order of orders) {
        const { data: product } = await supabase.from('products').select('name, slug').eq('id', order.product_id).single()
        const linkPerpanjang = `https://berbagiakun.com/dashboard/orders?perpanjang=${order.id}`
        const pesan = `Hi, akun ${product.name} kamu akan expired dalam ${days} hari. Perpanjang: ${linkPerpanjang}`
        if (order.user_wa) await sendWA(order.user_wa, pesan)
        // Admin notif juga? Bisa tambahkan di sini
      }
    }
  }
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } })
})
