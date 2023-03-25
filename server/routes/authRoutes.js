const { Router } = require('express');
const {
  signUp,
  login,
  refreshToken,
  getCurrentUser,
  logoutUser
} = require('../controllers/authController');
const verifyUser = require('../middlewares/verifyUser');

const router = Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.get('/refresh', refreshToken);
router.get('/logout', logoutUser);
router.get('/me', verifyUser, getCurrentUser);

module.exports = router;
