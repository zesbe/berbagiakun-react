import axios from 'axios';

export async function checkHealth() {
  try {
    const api = await axios.get('https://berbagiakun.com/api/check-session');
    if (!api.data) throw new Error("API Down");
    console.log("API OK");
    // Cek Edge Function via endpoint yang kamu expose
  } catch (e) {
    // Bisa kirim WA/email ke admin
    console.error("API/Function Problem:", e.message);
  }
}
