/** Authenticated project CRUD. Services enforce ownership before reading or changing a project. */
const express = require('express');
const projectController = require('../controllers/projectController.js');
const verify = require('../middleware/authMiddleware.js');
const asyncHandler = require('../middleware/asyncHandler.js');
const project = express.Router();

project.use(verify);

project.post('/',asyncHandler(projectController.createProject));
project.get('/',asyncHandler(projectController.getProjects));
project.get('/:id',asyncHandler(projectController.getProjectById));
project.put('/:id',asyncHandler(projectController.updateProject));
project.delete('/:id',asyncHandler(projectController.deleteProject));


module.exports =  project ;
