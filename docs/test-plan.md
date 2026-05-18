\# Test Plan — Containerization Kelompok 1



\## Informasi

\- Mata Kuliah: Administrasi Sistem

\- Proyek: Nusantara Tech — Development Environment in a Box

\- PIC Testing: Alfarel Abhipraya (Peran 3)



\## Skenario Pengujian



| No | Skenario | Langkah | Hasil Harapan | Status |

|----|----------|---------|---------------|--------|

| 1 | Semua container berjalan | Jalankan `docker-compose up -d`, cek `docker-compose ps` | Semua container status `Up` atau `healthy` | - |

| 2 | CRUD mahasiswa berfungsi | POST ke `/mahasiswa` dengan data JSON, lalu GET `/mahasiswa` | Data tersimpan dan bisa diambil dari DB | - |

| 3 | Upload file ke MinIO | POST ke `/mahasiswa/:id/upload` dengan file gambar | File muncul di bucket `akademik-files` di MinIO Console | - |

| 4 | Persistensi data setelah restart | Catat data, jalankan `down`, lalu `up` lagi, cek data | Data di DB dan file di MinIO masih ada | - |

| 5 | Service name bisa di-resolve | `docker exec` ke container app, jalankan `nslookup postgres` dan `nslookup minio` | Nama service berhasil di-resolve tanpa localhost | - |

| 6 | pgAdmin terhubung ke DB | Buka `http://localhost:5050`, tambah server baru ke `postgres:5432` | Tabel `mahasiswa` terlihat di pgAdmin | - |



\## Bug Log



| Tanggal | Peran Terkait | Deskripsi Bug | Status |

|---------|--------------|---------------|--------|

| | | | |

