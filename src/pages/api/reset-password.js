import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({error: "Email kosong"});
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) return res.status(400).json({error: error.message});
  res.json({ ok: true });
}
