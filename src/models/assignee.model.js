const mongoose = require("mongoose");

const defaultAssigneeId = "655e3aad768532b925bee578";
const AssigneeSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
    unique: true,
  },
  assignees: [
    {
      worker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
        required: true,
      },
    },
  ],
});

AssigneeSchema.path("assignees").default(() => [
  { worker_id: defaultAssigneeId },
]);

const Assignee = mongoose.model("Assignee", AssigneeSchema);

module.exports = Assignee;
