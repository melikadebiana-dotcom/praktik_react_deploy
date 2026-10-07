// Setiap lantai = satu layanan dengan isi form yang berbeda.
export const floors = [
  {
    id: 1, name: 'Informasi', color: '#cfe6fb',
    fields: [
      { name: 'nama', label: 'Nama', type: 'text', required: true },
      { name: 'pertanyaan', label: 'Pertanyaan', type: 'textarea', required: true },
    ],
  },
  {
    id: 2, name: 'Pengaduan', color: '#ffd1dc',
    fields: [
      { name: 'nama', label: 'Nama', type: 'text', required: true },
      { name: 'jenis', label: 'Jenis masalah', type: 'select', required: true,
        options: ['Fasilitas', 'Pelayanan', 'Kebersihan', 'Lainnya'] },
      { name: 'detail', label: 'Ceritakan masalahnya', type: 'textarea', required: true },
    ],
  },
  {
    id: 3, name: 'Reservasi Ruang', color: '#c4e8d8',
    fields: [
      { name: 'nama', label: 'Nama', type: 'text', required: true },
      { name: 'tanggal', label: 'Tanggal pakai', type: 'date', required: true },
      { name: 'orang', label: 'Jumlah orang', type: 'number', min: 1, max: 50, required: true },
    ],
  },
  {
    id: 4, name: 'Kotak Saran', color: '#fff0b8',
    fields: [
      { name: 'nama', label: 'Nama', type: 'text', required: false },
      { name: 'saran', label: 'Saran untuk kami', type: 'textarea', required: true },
    ],
  },
];
