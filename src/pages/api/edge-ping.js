export default async function handler(req, res) {
  try {
    // Bisa fetch ke edge function endpoint (cek response OK)
    const ping = await fetch("https://YOUR_SUPABASE_PROJECT.functions.supabase.co/reminder-expired");
    if (ping.ok) res.status(200).json({ ok: true });
    else throw new Error("Edge Function down");
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
