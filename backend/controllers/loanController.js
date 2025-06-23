// loanController.js
const db = require('../db');

// GET /api/loans
exports.getLoans = (req, res) => {
  db.query('SELECT * FROM loans', (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data', error: err.message });
    res.json(results);
  });
};

// POST /api/loans
exports.createLoan = (req, res) => {
  const { nisn, nama, kelas, tanggal_pinjam, tanggal_kembali, judul_buku } = req.body;

  const sql = `
    INSERT INTO loans (nisn, nama, kelas, tanggal_pinjam, tanggal_kembali, judul_buku)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [nisn, nama, kelas, tanggal_pinjam, tanggal_kembali, judul_buku];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menyimpan data', error: err.message });
    res.status(201).json({ message: 'Data berhasil disimpan', id: result.insertId });
  });
};


// PUT /api/loans/:id/return
exports.returnLoan = (req, res) => {
  const { id } = req.params;
  const { return_date } = req.body;

  const sql = `UPDATE loans SET return_date = ? WHERE id = ?`;
  const values = [return_date, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menandai pengembalian', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    res.json({ message: 'Peminjaman berhasil ditandai sebagai dikembalikan' });
  });
};