const { Router } = require('express');
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser
} = require('../controllers/userController');

const router = Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).patch(updateUser);

module.exports = router;
