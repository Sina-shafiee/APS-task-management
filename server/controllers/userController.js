const User = require('../models/userModel');

/**
 * @path GET /api/users
 * @desc get all users
 * @access PRIVATE
 */
module.exports.getUsers = async (_, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ message: 'success', data: users });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @path POST /api/users
 * @desc create user
 * @access PRIVATE
 */
module.exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: 'name, email and password field are require' });
  }

  try {
    const newUser = await User.create({ name, email, password });
    res.status(200).json({ message: 'success', data: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @path GET /api/users/:id
 * @desc update user
 * @access PRIVATE
 */
module.exports.updateUser = async (req, res) => {
  const { name, skills, language } = req.body;
};
