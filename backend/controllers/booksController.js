const db = require('../db');

// Get all books
exports.getBooks = (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Get book by id
exports.getBookById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(results[0]);
    });
};

// Search books by title or pengarang or kategori
exports.searchBooks = (req, res) => {
    const { query } = req.query;
    db.query(
        `SELECT * FROM books WHERE
         title LIKE ? OR
         pengarang LIKE ? OR
         kategori LIKE ?`,
        [`%${query}%`, `%${query}%`, `%${query}%`],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results);
        }
    );
};

// Create new book
exports.createBook = (req, res) => {
    const {
        isbn, title, pengarang, penerbit, thnterbit,
        kategori, bahasa, halaman, no_rak, cover_image_url
    } = req.body;

    db.query(
        `INSERT INTO books
         (isbn, title, pengarang, penerbit, thnterbit, kategori, bahasa, halaman, no_rak, cover_image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [isbn, title, pengarang, penerbit, thnterbit, kategori, bahasa, halaman, no_rak, cover_image_url],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Book created successfully', bookId: result.insertId });
        }
    );
};

// Update book
exports.updateBook = (req, res) => {
    const { id } = req.params;
    const {
        isbn, title, pengarang, penerbit, thnterbit,
        kategori, bahasa, halaman, no_rak, cover_image_url
    } = req.body;

    db.query(
        `UPDATE books SET
         isbn = ?, title = ?, pengarang = ?, penerbit = ?, thnterbit = ?,
         kategori = ?, bahasa = ?, halaman = ?, no_rak = ?, cover_image_url = ?
         WHERE id = ?`,
        [isbn, title, pengarang, penerbit, thnterbit, kategori, bahasa, halaman, no_rak, cover_image_url, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.json({ message: 'Book updated successfully' });
        }
    );
};

// Delete book
exports.deleteBook = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    });
};
