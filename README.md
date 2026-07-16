# Portofolio — Grace Sania Silalahi

Website portofolio statis (HTML/CSS/JS murni, tanpa framework/build step),
berisi konten yang sudah disesuaikan dengan CV terbaru: profil, pendidikan,
pengalaman kerja & organisasi, 5 proyek, keahlian teknis, dan prestasi.

## Struktur Folder

```
portfolio/
├── index.html      # halaman utama
├── style.css        # semua styling
├── script.js         # nav mobile, scroll-spy, animasi reveal
├── assets/
│   ├── foto-penulis.jpg
│   ├── foto-project1.jpg
│   ├── foto-project2.jpg
│   └── foto-project3.jpg
└── README.md
```

## Cara Menjalankan

**Cara paling cepat (tanpa terminal):**
Klik kanan pada `index.html` → **Open With** → pilih browser (Chrome/Edge/Firefox).

**Lewat terminal (disarankan, agar path gambar & font selalu benar):**

```bash
# Opsi 1 — pakai Python (biasanya sudah terpasang)
python3 -m http.server 8000
# lalu buka http://localhost:8000 di browser

# Opsi 2 — pakai Node.js (tanpa instalasi tambahan)
npx serve .
# lalu buka URL yang ditampilkan di terminal (biasanya http://localhost:3000)
```

**Lewat VS Code:**
Install ekstensi **Live Server**, lalu klik kanan `index.html` → **Open with Live Server**.

## Kustomisasi Cepat

- Ganti isi teks langsung di `index.html` (semua konten dalam Bahasa Indonesia).
- Ganti foto di folder `assets/` (gunakan nama file yang sama, atau ubah path `src` di `index.html`).
- Warna, font, dan spacing diatur lewat CSS variables di bagian atas `style.css` (`:root { ... }`).
