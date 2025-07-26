const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const DDC_MAPPING = {
  'Karya Umum': '000',
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

const Book = sequelize.define('Book', {
  ddc: {
    type: DataTypes.STRING,
    primaryKey: true, // ⬅️ menjadikan ddc sebagai primary key
    allowNull: false,
  },
  isbn: DataTypes.STRING,
  title: DataTypes.STRING,
  pengarang: DataTypes.STRING,
  penerbit: DataTypes.STRING,
  thnterbit: DataTypes.STRING,
  kategori: DataTypes.STRING,
  bahasa: DataTypes.STRING,
  halaman: DataTypes.INTEGER,
  no_rak: DataTypes.STRING,
  cover_image_url: DataTypes.STRING,
  stok: DataTypes.INTEGER,
}, {
  tableName: 'books',
  timestamps: true,
  id: false, // ⬅️ hilangkan id default Sequelize
  hooks: {
    beforeCreate: async (book, options) => {
      const baseCode = DDC_MAPPING[book.kategori];
      if (!baseCode) {
        throw new Error(`Kategori "${book.kategori}" tidak dikenali di DDC.`);
      }

      const count = await Book.count({ where: { kategori: book.kategori } });
      const nextNumber = (count + 1).toString().padStart(3, '0');
      book.ddc = `${baseCode}.${nextNumber}`;
    }
  }
});

module.exports = Book;
