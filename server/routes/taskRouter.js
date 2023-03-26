const { Router } = require('express');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getUserTasks,
  toggleCompleteState
} = require('../controllers/tasksController');

const verifyUser = require('../middlewares/verifyUser');
const verifyAdmin = require('../middlewares/verifyAdmin');

const router = Router();

router
  .route('/')
  .get(verifyUser, verifyAdmin, getAllTasks)
  .post(verifyUser, verifyAdmin, createTask);
router
  .route('/:taskId')
  .patch(verifyUser, verifyAdmin, updateTask)
  .delete(verifyUser, verifyAdmin, deleteTask);

router.route('/user/').get(verifyUser, getUserTasks);
router.route('/user/:taskId').patch(verifyUser, toggleCompleteState);

module.exports = router;
