import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  // Theme hanya di dashboard, bukan landing
  const isLanding = router.pathname === "/" || router.pathname.startsWith("/products");

  useEffect(() => {
    if (typeof window !== "undefined" && !isLanding) {
      const saved = localStorage.getItem("theme");
      if (saved) setTheme(saved);
      document.body.setAttribute("data-bs-theme", saved || "light");
    } else {
      document.body.setAttribute("data-bs-theme", "light");
    }
  }, [isLanding]);

  if (isLanding) return null;

  function toggleTheme() {
    const t = theme === "light" ? "dark" : "light";
    setTheme(t);
    localStorage.setItem("theme", t);
    document.body.setAttribute("data-bs-theme", t);
  }

  return (
    <button className="btn btn-outline-secondary btn-sm" style={{marginLeft:8}} onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
