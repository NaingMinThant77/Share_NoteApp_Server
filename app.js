const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config();
const multer = require("multer") // npm i multer
const path = require("path")
const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors())

const fileFilterConfigure = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storageConfigure = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '_' + file.originalname);
    },
});

app.use(multer({ storage: storageConfigure, fileFilter: fileFilterConfigure }).single("cover_image"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// routes
const noteRoute = require("./routes/note")
app.use(noteRoute)

mongoose.connect(process.env.MONGO_URL).then(_ => {
    app.listen(8080)
    console.log("Connect to database & running on port: 8080")
}).catch(err => {
    console.log(err)
})