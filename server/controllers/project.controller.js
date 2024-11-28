const Project = require("../models/project.model.js");

const showTasks = async(req,res) =>{
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({message: "Projects not found: " + error.message});
  }
}

const createTask = async(req,res) =>{
  try {
    const task = await Project.create(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const updateTask = async(req,res) =>{
  try {
    const {id} = req.params;
    const task = await Project.findOneAndUpdate(
      {_id:id},
      {$set: req.body},
      {new: true}
    );
    if(!task){
      return res.status(404).json({message: "Task not found"});
    }
    const updatedTask = await Project.find({_id: id});
    res.json(updatedTask);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}


const deleteTask = async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Project.findOneAndDelete({_id: id});
    if(!task){
      return res.status(404).json({message: "task not found"});
    }
    res.json({message: "Task deleted successfully"});
  } catch (error) {
    res.status(404).send({message: error.message});
  }
}

module.exports = {
  showTasks,
  createTask,
  updateTask,
  deleteTask,
}