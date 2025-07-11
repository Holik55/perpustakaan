const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Book = sequelize.define('Book', {
  isbn: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  pengarang: {
    type: DataTypes.STRING,
  },
  penerbit: {
    type: DataTypes.STRING,
  },
  thnterbit: {
    type: DataTypes.STRING,
  },
  kategori: {
    type: DataTypes.STRING,
  },
  bahasa: {
    type: DataTypes.STRING,
  },
  halaman: {
    type: DataTypes.INTEGER,
  },
  no_rak: {
    type: DataTypes.STRING,
  },
  cover_image_url: {
    type: DataTypes.STRING,
  },
      stok: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'books',
  timestamps: false,
});

module.exports = Book;
