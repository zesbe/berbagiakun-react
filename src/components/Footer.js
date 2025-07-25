import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer-fixed text-center py-4">
      <small>&copy; {new Date().getFullYear()} BerbagiAkun.com | Powered by Supabase & Next.js</small>
      <br />
      <Link href="/products" className="footer-link mx-2">Produk</Link>
      <Link href="/terms" className="footer-link mx-2">Syarat & Ketentuan</Link>
      <Link href="/privacy" className="footer-link mx-2">Privacy</Link>
    </footer>
  );
}
