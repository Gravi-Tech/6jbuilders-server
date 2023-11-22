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

const feedbackRoutes = require("./src/routes/feedback.routes");
app.use("/api", feedbackRoutes);

const materialRoutes = require("./src/routes/material.routes");
app.use("api", materialRoutes);

const notificationRoutes = require("./src/routes/notification.routes");
app.use("api", notificationRoutes);

const projectRoutes = require("./src/routes/project.routes");
app.use("/api", projectRoutes);

const serviceRoutes = require("./src/routes/service.routes");
app.use("/api", serviceRoutes);

const userRoutes = require("./src/routes/user.routes");
app.use("/api", userRoutes);

const workerRoutes = require("./src/routes/worker.routes");
app.use("/api", workerRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
