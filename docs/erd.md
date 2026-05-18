# ERD — Skema Database

## Tabel: mahasiswa

| Kolom | Tipe Data | Constraint |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| nim | VARCHAR(20) | UNIQUE, NOT NULL |
| nama | VARCHAR(100) | NOT NULL |
| jurusan | VARCHAR(100) | - |
| foto_url | TEXT | - (path file di MinIO) |
| created_at | TIMESTAMP | DEFAULT NOW() |