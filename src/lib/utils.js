export function formatRupiah(nominal) {
  return "Rp" + (nominal||0).toLocaleString("id-ID");
}

export function formatDate(str) {
  if (!str) return "-";
  return new Date(str).toLocaleDateString("id-ID");
}
