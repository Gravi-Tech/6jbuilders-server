const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Task",
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bg_img: {
    type: String,
    required: true,
  },
  project_imgs: [
    {
      type: String,
      required: true,
    },
  ],
  date_completed: {
    type: String,
    required: true,
  },
  description: [
    {
      type: String,
      required: true,
    },
  ],
  service: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
