const Book = require('../models/Book');
const { getDDCPrefix } = require('../utils/ddcGenerator');

// GET all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.ddc);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH books
exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.findAll({
      where: {
        [Book.sequelize.Op.or]: [
          { title: { [Book.sequelize.Op.like]: `%${query}%` } },
          { pengarang: { [Book.sequelize.Op.like]: `%${query}%` } },
          { kategori: { [Book.sequelize.Op.like]: `%${query}%` } },
        ],
      },
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE book
exports.createBook = async (req, res) => {
  try {
    const {
      isbn, title, pengarang, penerbit, thnterbit,
      kategori, bahasa, halaman, no_rak,
      cover_image_url, stok
    } = req.body;

    // 1. Ambil prefix DDC berdasarkan kategori
    const ddcPrefix = getDDCPrefix(kategori); // Misalnya "600"

    // 2. Hitung jumlah buku yang sudah ada di kategori tersebut
    const count = await Book.count({ where: { kategori } });

    // 3. Buat DDC Number → misal "600.001", "600.002"
    const ddcNumber = `${ddcPrefix}.${String(count + 1).padStart(3, '0')}`;

    // 4. Simpan buku baru
    const book = await Book.create({
      isbn,
      title,
      pengarang,
      penerbit,
      thnterbit,
      kategori,
      bahasa,
      halaman,
      no_rak,
      cover_image_url,
      stok,
      ddc: ddcNumber
    });

    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menambahkan buku', error });
  }
};

// UPDATE book
exports.updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { ddc: req.params.ddc },
    });
    if (updated === 0) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE book
exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({ where: { ddc: req.params.ddc } });
    if (deleted === 0) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
