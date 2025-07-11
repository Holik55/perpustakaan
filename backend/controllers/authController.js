const User = require('../models/User');

// REGISTER
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username sudah digunakan' });
    }

    await User.create({ username, password });
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username, password } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    const [updated] = await User.update(
      { password: newPassword },
      { where: { username } }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
