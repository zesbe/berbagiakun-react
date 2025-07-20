// Jalankan: node src/lib/seed-products.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const produk = [
  {
    name: 'Netflix Premium',
    slug: 'netflix',
    description: 'Akun Netflix Premium legal dan original.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/440px-Netflix_2015_logo.svg.png',
    category: 'Video & Movie Streaming',
    type: 'auto',
    base_price: 60000,
  },
  // ...lanjut produk lain...
];

(async () => {
  for (let p of produk) {
    await supabase.from('products').insert([p]);
  }
  console.log('Seed produk selesai!');
})();
