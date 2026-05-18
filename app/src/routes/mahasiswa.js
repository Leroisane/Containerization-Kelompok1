const express     = require('express');
const router      = express.Router();
const multer      = require('multer');
const pool        = require('../db');
const minioClient = require('../minio');

const upload      = multer({ storage: multer.memoryStorage() });
const BUCKET_NAME = 'akademik-files';

// GET semua mahasiswa
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mahasiswa ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error GET:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

// POST tambah mahasiswa baru
router.post('/', async (req, res) => {
  const { nim, nama, jurusan } = req.body;
  if (!nim || !nama) {
    return res.status(400).json({ error: 'nim dan nama wajib diisi' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO mahasiswa (nim, nama, jurusan) VALUES ($1, $2, $3) RETURNING *',
      [nim, nama, jurusan]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error POST:', err.message);
    res.status(500).json({ error: 'Gagal menambah data' });
  }
});

// PUT update mahasiswa
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nim, nama, jurusan } = req.body;
  try {
    const result = await pool.query(
      'UPDATE mahasiswa SET nim=$1, nama=$2, jurusan=$3 WHERE id=$4 RETURNING *',
      [nim, nama, jurusan, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error PUT:', err.message);
    res.status(500).json({ error: 'Gagal mengupdate data' });
  }
});

// DELETE hapus mahasiswa
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM mahasiswa WHERE id=$1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('Error DELETE:', err.message);
    res.status(500).json({ error: 'Gagal menghapus data' });
  }
});

// POST upload file ke MinIO
router.post('/:id/upload', upload.single('file'), async (req, res) => {
  const { id } = req.params;
  if (!req.file) {
    return res.status(400).json({ error: 'Tidak ada file yang diupload' });
  }
  try {
    const mhs = await pool.query('SELECT * FROM mahasiswa WHERE id=$1', [id]);
    if (mhs.rows.length === 0) {
      return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
    }
    const nim        = mhs.rows[0].nim;
    const objectName = `${nim}/${req.file.originalname}`;

    await minioClient.putObject(
      BUCKET_NAME, objectName,
      req.file.buffer, req.file.size,
      { 'Content-Type': req.file.mimetype }
    );

    await pool.query(
      'UPDATE mahasiswa SET foto_url=$1 WHERE id=$2',
      [objectName, id]
    );

    res.json({ message: 'File berhasil diupload', path: objectName });
  } catch (err) {
    console.error('Error UPLOAD:', err.message);
    res.status(500).json({ error: 'Gagal mengupload file' });
  }
});

module.exports = router;