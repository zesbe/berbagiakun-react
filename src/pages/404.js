import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="container text-center py-5">
      <h1>404</h1>
      <p>Halaman tidak ditemukan. <Link href="/">Kembali ke Beranda</Link></p>
    </div>
  );
}
