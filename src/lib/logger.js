export function logEvent(type, detail) {
  // Simpan ke table notifications/logs jika mau, atau console.log
  console.log(`[${new Date().toISOString()}] [${type}]`, detail);
}
