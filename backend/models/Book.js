const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Book = sequelize.define('Book', {
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
  timestamps: true, // ⬅️ aktifkan fitur otomatis createdAt & updatedAt
});

module.exports = Book;
