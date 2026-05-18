# Arsitektur Sistem

## Service & Port

| Layanan | Image | Port Host | Port Container |
|---|---|---|---|
| app | node:18-alpine (custom) | 3000 | 3000 |
| postgres | postgres:15-alpine | - | 5432 |
| minio | minio/minio | 9000, 9001 | 9000, 9001 |
| pgadmin | dpage/pgadmin4 | 5050 | 80 |

## Komunikasi Antar Service
- app → postgres : port 5432 (nama service: "postgres", BUKAN "localhost")
- app → minio : port 9000 (nama service: "minio", BUKAN "localhost")

## Nama Network
- nusantara-network (driver: bridge)

## Nama Volume
- postgres-data
- minio-data

## Nama Service (wajib dipakai persis seperti ini)
- postgres
- minio
- app
- pgadmin