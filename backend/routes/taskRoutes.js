/** Nested task routes. mergeParams preserves projectId from the parent mount in app.js. */
const express = require('express');
const verify = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');
const asyncHandler = require('../middleware/asyncHandler.js');

const task = express.Router({mergeParams: true});

task.use(verify);

task.post('/',asyncHandler(taskController.createTask));
task.get('/',asyncHandler(taskController.getTasks));
task.get('/:id',asyncHandler(taskController.getTaskById));
task.put('/:id',asyncHandler(taskController.updateTask));
task.delete('/:id',asyncHandler(taskController.deleteTask));


module.exports = task ;
