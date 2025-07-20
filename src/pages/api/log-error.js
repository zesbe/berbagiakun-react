export default async function handler(req, res) {
  const { type, message, info } = req.body;
  // Bisa kirim ke DB, Discord, Telegram, dsb
  console.error(`[ERROR][${type}]`, message, info);
  res.status(200).json({ ok: true });
}
