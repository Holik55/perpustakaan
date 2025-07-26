const Book = require('../models/Book');

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
    const book = await Book.findByPk(req.params.id);
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
    const book = await Book.create(req.body);
    res.status(201).json({ message: 'Book created', bookId: book.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE book
exports.updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id },
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
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (deleted === 0) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
