import { sendWA } from "../../lib/whatsapp";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  const { to, message } = req.body;
  if (!to || !message) return res.status(400).json({error:"Data tidak lengkap"});
  try {
    await sendWA(to, message);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
