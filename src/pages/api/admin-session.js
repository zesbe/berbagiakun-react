export default function handler(req, res) {
  const admin = req.cookies?.admin || req.headers['x-admin-email'];
  if (admin === process.env.ADMIN_EMAIL) {
    res.json({ admin: true });
  } else {
    res.status(401).json({ admin: false });
  }
}
