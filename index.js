const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoDB = require('./src/database/mongodb')
const app = express()
const port = process.env.PORT || 3000

const db = new MongoDB()
db.connect()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", (req, res)=>{
    res.json({
        sms: "Hello from express."
    })
})

const userRoutes = require('./src/routes/user.routes')
app.use('/api', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})