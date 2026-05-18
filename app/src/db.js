const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.POSTGRES_HOST,
  user:     process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port:     5432
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Gagal konek ke PostgreSQL:', err.message);
  } else {
    console.log('Berhasil konek ke PostgreSQL!');
    release();
  }
});

module.exports = pool;