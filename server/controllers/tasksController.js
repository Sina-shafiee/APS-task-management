const Task = require('../models/taskModel');

/**
 * @path GET /api/tasks
 * @desc get all tasks
 * @access Private admin only
 */
module.exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort('-createdAt');
    if (!tasks.length) {
      return res.status(404).json({ message: 'No task found' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @path GET /api/tasks/user
 * @desc get all tasks
 * @access Private user and admin
 */
module.exports.getUserTasks = async (req, res) => {
  const { _id } = req.currentUser;
  try {
    const tasks = await Task.find({ userId: _id }).sort('-createdAt');
    if (!tasks.length) {
      return res.status(404).json({ message: 'No task found' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @path POST /api/tasks
 * @desc create new task
 * @access Private admin only
 */
module.exports.createTask = async (req, res) => {
  const { title, userId, desc } = req.body;

  console.log(req.body);
  if (!title || !userId || !desc) {
    return res.status(400).json({ message: 'All felids are required' });
  }

  try {
    const newTask = await Task.create({ title, desc, userId });
    return res.status(404).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @path PATCH /api/tasks/:taskId
 * @desc update a task
 * @access Private only admin
 */
module.exports.updateTask = async (req, res) => {
  const { title, userId, isCompleted, desc } = req.body;
  const { taskId } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        userId,
        isCompleted,
        desc
      },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @path PATCH /api/tasks/user/:taskId
 * @desc update complete state
 * @access Private user & admin
 */
module.exports.toggleCompleteState = async (req, res) => {
  const { isCompleted } = req.body;

  const { taskId } = req.params;
  const { _id } = req.currentUser;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: 'Task was not found'
      });
    }

    if (task.userId.toString() !== _id.toString()) {
      console.log(task.userId, _id);
      return res.status(401).json({
        message: "Unauthorized, you don't have access to edit this task"
      });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        isCompleted
      },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @path DELETE /api/tasks/:taskId
 * @desc delete a task
 * @access Private only admin
 */
module.exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
