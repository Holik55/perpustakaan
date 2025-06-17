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
  const { nisn, nama, kelas, tanggal_pinjam, tanggal_kembali } = req.body;

  const sql = `
    INSERT INTO loans (nisn, nama, kelas, tanggal_pinjam, tanggal_kembali)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [nisn, nama, kelas, tanggal_pinjam, tanggal_kembali];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menyimpan data', error: err.message });
    res.status(201).json({ message: 'Data berhasil disimpan', id: result.insertId });
  });
};
