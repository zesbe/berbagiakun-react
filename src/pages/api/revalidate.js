export default async function handler(req, res) {
  const { secret, path } = req.query;
  if (secret !== process.env.REVALIDATE_SECRET) return res.status(401).json({error:"Invalid token"});
  try {
    await res.revalidate(path || "/");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
}
