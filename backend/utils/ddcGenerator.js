const categoryToDDC = {
  'Filsafat dan Psikologi': '100',
  'Agama': '200',
  'Ilmu Sosial': '300',
  'Bahasa': '400',
  'Ilmu Alam dan Matematika': '500',
  'Teknologi': '600',
  'Kesenian dan Rekreasi': '700',
  'Sastra': '800',
  'Sejarah dan Geografi': '900'
};

module.exports = {
  getDDCPrefix(kategori) {
    return categoryToDDC[kategori] || '000'; // default jika kategori tidak dikenal
  }
};
