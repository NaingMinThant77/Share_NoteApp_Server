const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config();

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors())

// routes
const noteRoute = require("./routes/note")
app.use(noteRoute)

mongoose.connect(process.env.MONGO_URL).then(_ => {
    app.listen(8080)
    console.log("Connect to database & running on port: 8080")
}).catch(err => {
    console.log(err)
})