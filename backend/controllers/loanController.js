const Loan = require('../models/Loan');

// GET all loans
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data', error: err.message });
  }
};

// CREATE loan
exports.createLoan = async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json({ message: 'Data berhasil disimpan', id: loan.id });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menyimpan data', error: err.message });
  }
};

// RETURN loan
exports.returnLoan = async (req, res) => {
  const { return_date } = req.body;
  try {
    const [updated] = await Loan.update(
      { return_date },
      { where: { id: req.params.id } }
    );
    if (updated === 0) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    res.json({ message: 'Peminjaman berhasil ditandai sebagai dikembalikan' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menandai pengembalian', error: err.message });
  }
};
