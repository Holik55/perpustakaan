const categoryToDDC = {
  'Filsafat': '100',
  'Agama': '200',
  'Ilmu Sosial': '300',
  'Bahasa': '400',
  'Sains': '500',
  'Teknologi': '600',
  'Seni': '700',
  'Sastra': '800',
  'Sejarah': '900'
};

module.exports = {
  getDDCPrefix(kategori) {
    return categoryToDDC[kategori] || '000'; // default jika kategori tidak dikenal
  }
};
