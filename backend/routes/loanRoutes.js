const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.get('/loans', loanController.getLoans);
router.post('/loans', loanController.createLoan);

module.exports = router;
