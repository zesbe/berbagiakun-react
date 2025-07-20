// Jalankan: node src/lib/admin-tools.js
const bcrypt = require('bcryptjs');
const password = "youradminpassword";
bcrypt.hash(password, 10).then(hash => {
  console.log("Paste ke Supabase SQL:");
  console.log(`insert into admin_users (email, password) values ('admin@berbagiakun.com', '${hash}');`);
});
