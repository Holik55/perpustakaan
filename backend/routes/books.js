const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.getBooks);
router.get('/:ddc', booksController.getBookById);
router.get('/search/query', booksController.searchBooks);
router.post('/', booksController.createBook);
router.put('/:ddc', booksController.updateBook);
router.delete('/:ddc', booksController.deleteBook);

module.exports = router;
