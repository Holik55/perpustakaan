const db = require('../db');

exports.register = (req, res) => {
    const { username, password } = req.body;
    db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'User registered successfully' });
        }
    );
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            res.json({ message: 'Login successful' });
        }
    );
};

exports.logout = (req, res) => {
    // Tanpa session/jwt, logout di sisi client saja
    res.json({ message: 'Logout successful' });
};

exports.resetPassword = (req, res) => {
    const { username, newPassword } = req.body;
    db.query(
        'UPDATE users SET password = ? WHERE username = ?',
        [newPassword, username],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Password reset successful' });
        }
    );
};
