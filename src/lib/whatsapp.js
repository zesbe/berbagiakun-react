import axios from 'axios'
import FormData from 'form-data'

export async function sendWA(to, message) {
  const form = new FormData()
  form.append('appkey', process.env.WAPANELS_APPKEY)
  form.append('authkey', process.env.WAPANELS_AUTHKEY)
  form.append('to', to)
  form.append('message', message)
  await axios.post('https://app.wapanels.com/api/create-message', form, {
    headers: form.getHeaders(),
  })
}
