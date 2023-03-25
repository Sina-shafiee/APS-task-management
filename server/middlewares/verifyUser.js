const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: 'Unauthorized token is not provided' });
  }

  jwt.verify(token, process.env.ACCESS_SECRET, async (err, payload) => {
    if (err) {
      return res
        .status(403)
        .json({ message: 'Unauthorized token is not valid' });
    }
    try {
      const user = await User.findById(payload.id).select('-password');

      req.currentUser = user;
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
};
