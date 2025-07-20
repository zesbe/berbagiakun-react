export default function Footer() {
  return (
    <footer className="footer-fixed text-center py-4">
      <small>&copy; {new Date().getFullYear()} BerbagiAkun.com | Powered by Supabase & Next.js</small>
      <br />
      <a href="/products" className="footer-link mx-2">Produk</a>
      <a href="/terms" className="footer-link mx-2">Syarat & Ketentuan</a>
      <a href="/privacy" className="footer-link mx-2">Privacy</a>
    </footer>
  );
}
