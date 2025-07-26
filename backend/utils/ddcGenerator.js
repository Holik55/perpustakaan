const categoryToDDC = {
  'Buku Pelajaran': '100',
  'Agama': '200',
  'Fiksi': '300',
  'Budaya': '400',
  'Sains': '500',
  'Teknologi': '600',
  'Bahasa': '700',
  'Edukasi': '800',
  'Sejarah': '900'
};

module.exports = {
  getDDCPrefix(kategori) {
    return categoryToDDC[kategori] || '000'; // default jika kategori tidak dikenal
  }
};
