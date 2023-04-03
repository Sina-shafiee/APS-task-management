const { Router } = require('express');
const {
  getUsers,
  createUser,
  getSingleUser
} = require('../controllers/userController');

const router = Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser);

module.exports = router;
