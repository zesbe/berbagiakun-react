import { sendWA } from "../../lib/whatsapp";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  const { numbers, message } = req.body;
  if (!Array.isArray(numbers) || !message) return res.status(400).json({error:"Data tidak lengkap"});
  let result = [];
  for (const to of numbers) {
    try {
      await sendWA(to, message);
      result.push({to, ok:true});
    } catch (e) {
      result.push({to, ok:false, error:e.message});
    }
  }
  res.status(200).json({ ok: true, result });
}
