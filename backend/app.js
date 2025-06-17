const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api', loanRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
