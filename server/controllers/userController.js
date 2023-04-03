const User = require('../models/userModel');

/**
 * @path GET /api/users
 * @desc get all users
 * @access PRIVATE
 */
module.exports.getUsers = async (_, res) => {
  try {
    const users = await User.find({}).select('-password').sort('-createdAt');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @path GET /api/users/:userId
 * @desc get  user by id
 * @access PRIVATE
 */
module.exports.getSingleUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(user);
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
  const { userId } = req.params;
  const { name, skills, language, email, social } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        skills,
        language,
        social
      },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
