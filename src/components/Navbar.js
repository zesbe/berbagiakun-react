import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function go(path) {
    setOpen(false);
    router.push(path);
  }

  return (
    <nav className="navbar navbar-expand-lg header-fixed sticky-top">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand fw-bold" style={{ fontSize: 22 }}>
          <img src="/icons/netflix.svg" alt="" width={28} height={28} style={{marginRight:8}} />
          BerbagiAkun
        </Link>
        <button className="navbar-toggler" onClick={()=>setOpen(!open)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${open ? " show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-end">
            <li className="nav-item"><Link className="nav-link" href="/products">Produk</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/login">Login</Link></li>
          </ul>
        </div>
      </div>
      <style jsx global>{`
        .navbar-brand img {vertical-align:middle;}
        .navbar { font-size: 1rem;}
        @media (max-width: 991px) {
          .navbar .navbar-collapse {
            background: #fff;
            padding: 12px 0 8px 0;
          }
          .navbar .navbar-nav .nav-link {
            padding: 8px 12px;
            font-size: 1.08rem;
          }
        }
        .navbar .nav-link, .navbar .navbar-brand {
          color: #0d47a1 !important;
        }
      `}</style>
    </nav>
  );
}
