const { Router } = require('express');
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const verifyUser = require('../middlewares/verifyUser');
const verifyAdmin = require('../middlewares/verifyAdmin');

const router = Router();

router
  .route('/')
  .get(verifyUser, verifyAdmin, getUsers)
  .post(verifyUser, verifyAdmin, createUser);
router
  .route('/:userId')
  .get(verifyUser, verifyAdmin, getSingleUser)
  .patch(verifyUser, verifyAdmin, updateUser)
  .delete(verifyUser, verifyAdmin, deleteUser);

module.exports = router;
