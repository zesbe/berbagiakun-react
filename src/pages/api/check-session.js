import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ user: null });
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ user: null });
  res.status(200).json({ user });
}
