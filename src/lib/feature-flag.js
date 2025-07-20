import { supabase } from "./supabase";
export async function isFeatureEnabled(key) {
  const { data } = await supabase.from("settings").select("*").eq("key", key).single();
  return data?.value === "true";
}
