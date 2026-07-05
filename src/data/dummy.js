export const videos = [
  { id: 1, judul: "Pengenalan Pecahan", deskripsi: "Video animasi pengenalan pecahan dasar", durasi: "08:24", status: "aktif", uploaded: "2025-05-10", thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400" },
  { id: 2, judul: "Operasi Penjumlahan Pecahan", deskripsi: "Cara menjumlahkan pecahan dengan penyebut berbeda", durasi: "10:12", status: "aktif", uploaded: "2025-05-12", thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400" },
  { id: 3, judul: "Pembagian Pecahan", deskripsi: "Konsep pembagian pecahan", durasi: "07:48", status: "nonaktif", uploaded: "2025-05-15", thumbnail: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400" },
];

export const kuis = [
  {
    id: 1, judul: "Kuis Pecahan Dasar", deskripsi: "10 soal pilihan ganda", jumlahSoal: 10, status: "aktif",
    soal: [
      { pertanyaan: "Berapa hasil 1/2 + 1/4?", jawaban: "3/4" },
      { pertanyaan: "Sederhanakan 4/8", jawaban: "1/2" },
    ],
  },
  { id: 2, judul: "Kuis Operasi Pecahan", deskripsi: "15 soal campuran", jumlahSoal: 15, status: "aktif", soal: [] },
];

export const siswa = [
  { id: 1, nama: "Ahmad Rizki", nis: "2024001", kelas: "5A" },
  { id: 2, nama: "Siti Nurhaliza", nis: "2024002", kelas: "5A" },
  { id: 3, nama: "Budi Santoso", nis: "2024003", kelas: "5B" },
  { id: 4, nama: "Dewi Lestari", nis: "2024004", kelas: "5B" },
];

export const hasil = [
  { id: 1, siswa: "Ahmad Rizki", kuis: "Kuis Pecahan Dasar", nilai: 90, tanggal: "2025-05-20", status: "lulus" },
  { id: 2, siswa: "Siti Nurhaliza", kuis: "Kuis Pecahan Dasar", nilai: 85, tanggal: "2025-05-20", status: "lulus" },
  { id: 3, siswa: "Budi Santoso", kuis: "Kuis Operasi Pecahan", nilai: 65, tanggal: "2025-05-21", status: "remedial" },
  { id: 4, siswa: "Dewi Lestari", kuis: "Kuis Pecahan Dasar", nilai: 95, tanggal: "2025-05-21", status: "lulus" },
];
