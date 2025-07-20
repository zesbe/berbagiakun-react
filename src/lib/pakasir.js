import axios from "axios";

export async function getTransactionStatus({ amount, order_id }) {
  const apiKey = process.env.PAKASIR_API_KEY;
  const url = `https://pakasir.zone.id/api/transactiondetail?project=berbagiakun&amount=${amount}&order_id=${order_id}&api_key=${apiKey}`;
  const { data } = await axios.get(url);
  if (!data.transaction) throw new Error("Transaksi tidak ditemukan");
  return data.transaction;
}
