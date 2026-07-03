# Portfolio Website

Portofolio personal lengkap dengan server Node.js, halaman frontend, API profil, dan API kontak.

## Menjalankan lokal

```bash
npm start
```

Buka:

```text
http://localhost:3000
```

Jangan buka `public/index.html` langsung dengan `file://` kalau ingin form kontak dan data API bekerja. Jalankan server lalu buka alamat localhost di atas.

## Mengubah isi portofolio

Edit data di:

```text
data/profile.json
```

Bagian yang bisa kamu ubah:

- Nama, role, email, nomor HP, lokasi
- Link GitHub, LinkedIn, Instagram, resume
- Skill, layanan, project, dan pengalaman

Pesan dari form kontak akan tersimpan di:

```text
data/messages.json
```

## Deploy ke server/domain

1. Upload seluruh folder ini ke VPS atau hosting yang mendukung Node.js.
2. Jalankan `npm start`.
3. Atur environment:

```text
HOST=0.0.0.0
PORT=3000
```

4. Arahkan domain ke server.
5. Pakai reverse proxy seperti Nginx/Caddy agar domain publik mengarah ke `localhost:3000`.

Contoh Nginx:

```nginx
server {
  server_name domainkamu.com www.domainkamu.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
