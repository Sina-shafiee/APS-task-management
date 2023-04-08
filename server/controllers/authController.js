const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const hashPass = require('../utils/hashPass');
const signJwt = require('../utils/signJwt');
const { cloudinary } = require('../utils/cloudinary');

/**
 * @path POST /api/auth/sign-up
 * @desc user sign up
 * @access PUBLIC
 */
module.exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return res
      .status(400)
      .json({ message: 'Account with this Email already exist' });
  }

  try {
    // encrypt password
    const hashedPass = await hashPass(password);

    // create new user
    const newUser = await User.create({ name, email, password: hashedPass });

    return res.status(201).json({ message: 'success' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error. Something went wrong' });
  }
};

/**
 * @path POST /api/auth/login
 * @desc user and admin login
 * @access PUBLIC
 */
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All felids are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    // generating and setting refresh token on cookie
    const refreshToken = signJwt(user._id, 'refresh');
    res.cookie('refresh-token', refreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
      httpOnly: true,
      sameSite: 'lax'
    });

    // generating access token
    const accessToken = signJwt(user._id, 'access');

    res.status(200).json({
      message: 'success',
      user: { email: user.email, _id: user._id, role: user.role },
      access_token: accessToken
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error. Something went wrong' });
  }
};

/**
 * @path POST /api/auth/refresh
 * @desc checks the refresh token on cookie send new access token
 * @access Private user & admin
 */
module.exports.refreshToken = async (req, res) => {
  const cookie = req.headers.cookie;

  if (!cookie) {
    return res.status(421).json({ message: 'No refresh token found' });
  }

  const token = cookie.split('=')[1];

  jwt.verify(token, process.env.REFRESH_SECRET, (err, payload) => {
    if (err) {
      return res.status(421).json({ message: 'invalid refresh token' });
    }

    const newAccessToken = signJwt(payload.id, 'access');

    res.status(200).json({ token: newAccessToken });
  });
};

/**
 * @path POST /api/auth/logout
 * @desc clear user cookie and logout
 * @access Private
 */
module.exports.logoutUser = (req, res) => {
  try {
    res.clearCookie('refresh-token');
    res.status(200).json({ message: 'success' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error. something went wrong' });
  }
};

/**
 * @path GET /api/auth/me
 * @desc return current user info
 * @access Private user & admin
 */
module.exports.getCurrentUser = (req, res) => {
  try {
    const user = req.currentUser;
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error. Something went wrong' });
  }
};

/**
 * @path PATCH /api/auth/me
 * @desc update current user
 * @access Private user & admin
 */
module.exports.updateCurrentUser = async (req, res) => {
  const { _id } = req.currentUser;
  const { name, skills, social, language, image } = req.body;
  try {
    const uploadedImage = await cloudinary.uploader.upload(image, {
      upload_preset: 'aps-taskdo',
      height: 300,
      width: 300
    });

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, skills, social, language, image: uploadedImage.url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error. Something went wrong' });
  }
};
