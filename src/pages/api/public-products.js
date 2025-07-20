import { supabase } from "../../lib/supabase";
export default async function handler(req, res) {
  const { data } = await supabase.from("products").select("id,name,slug,description,image_url,category,type,base_price").order("created_at",{ascending:false});
  res.json({ products: data });
}
