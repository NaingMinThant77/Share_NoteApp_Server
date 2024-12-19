const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors())

// routes
const postRoutes = require("./routes/post");
app.use(postRoutes);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});