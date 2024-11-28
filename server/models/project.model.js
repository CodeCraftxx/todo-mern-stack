const mongoose = require('mongoose');
const projectSchema = mongoose.Schema(
  {
    task: { type: String, required: [true, "task is required!"] },
    complete: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;