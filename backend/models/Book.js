const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const DDC_MAPPING = {
  'Komputer': '000',
  'Filsafat': '100',
  'Agama': '200',
  'Sosial': '300',
  'Bahasa': '400',
  'Sains': '500',
  'Teknologi': '600',
  'Seni': '700',
  'Literatur': '800',
  'Sejarah': '900'
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
