import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.signOut().then(() => {
      localStorage.removeItem("admin");
      router.push("/");
    });
  }, []);
  return <div className="container py-5 text-center">Logging out...</div>;
}
