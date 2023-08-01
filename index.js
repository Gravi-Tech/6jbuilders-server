const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoDB = require('./src/database/mongodb');
const app = express();
const port = process.env.PORT || 3000;

const db = new MongoDB();
db.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const adminRoutes = require('./src/admin/routes/admin.routes');
app.use('/api', adminRoutes);

const assigneeRoutes = require('./src/assignee/routes/assignee.routes');
app.use('/api', assigneeRoutes);

const bookingRoutes = require('./src/booking/routes/booking.routes');
app.use('/api', bookingRoutes);

const feedbackRoutes = require('./src/feedback/routes/feedback.routes');
app.use('/api', feedbackRoutes);

const materialRoutes = require('./src/material/routes/material.routes');
app.use('api', materialRoutes);

const notificationRoutes = require('./src/notification/routes/notification.routes');
app.use('api', notificationRoutes);

const projectRoutes = require('./sr/project/routes/project.routes');
app.use('/api', projectRoutes);

const serviceRoutes = require('./src/service/routes/service.routes');
app.use('/api', serviceRoutes);

const userRoutes = require('./src/user/routes/user.routes');
app.use('/api', userRoutes);



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});