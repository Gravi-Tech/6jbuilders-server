const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Task",
  },
  title: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date_completed: {
    type: Date,
    required: true,
  },
  bg_project_img: {
    type: String,
    required: true,
  },
  project_imgs: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  update_date: {
    type: Date,
    default: Date.now,
  },
});

ProjectSchema.pre("save", async function (next) {
  const task = await this.model("Task").findById(this.task_id);
  if (task) {
    this.service = task.service;
    this.location = task.location;
    this.date_completed = task.date_completed;
  }
  next();
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
