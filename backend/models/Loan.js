const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Loan = sequelize.define('Loan', {
  nisn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kelas: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal_pinjam: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tanggal_kembali: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  judul_buku: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  }
}, {
  tableName: 'loans',
  timestamps: false,
});

module.exports = Loan;
