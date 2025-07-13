require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const loanRoutes = require('./routes/loanRoutes');
const sequelize = require('./sequelize');
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ All models synced');
});


const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://perpusfrontend-gules.vercel.app', // ganti dengan domain Vercel kamu
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api', loanRoutes);
app.get("/", (req, res) => {
    res.json({message: "ping succesfully"})
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

