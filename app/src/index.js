require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const mahasiswaRoutes = require('./routes/mahasiswa');
app.use('/mahasiswa', mahasiswaRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});