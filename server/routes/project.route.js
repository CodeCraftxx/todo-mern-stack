const express = require('express');
const router = express.Router();
const Project = require('../models/project.model.js');
const {showTasks, createTask, updateTask, deleteTask} = require('../controllers/project.controller.js');

router.get('/', showTasks);
// router.get('/:title', showSearchProject);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;