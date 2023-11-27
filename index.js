const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoDB = require("./src/database/mongodb");
const app = express();
const port = process.env.PORT || 3000;

const db = new MongoDB();
db.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const adminRoutes = require("./src/routes/admin.routes");
app.use("/api", adminRoutes);

const assigneeRoutes = require("./src/routes/assignee.routes");
app.use("/api", assigneeRoutes);

const bookingRoutes = require("./src/routes/booking.routes");
app.use("/api", bookingRoutes);

const projectRoutes = require("./src/routes/project.routes");
app.use("/api", projectRoutes);

const serviceRoutes = require("./src/routes/service.routes");
app.use("/api", serviceRoutes);

const taskRoutes = require("./src/routes/task.routes");
app.use("/api", taskRoutes);

const userRoutes = require("./src/routes/user.routes");
app.use("/api", userRoutes);

const workerRoutes = require("./src/routes/worker.routes");
app.use("/api", workerRoutes);

const reasonRoutes = require("./src/routes/reason.routes");
app.use("/api", reasonRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
