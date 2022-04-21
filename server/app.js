const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const _ = require("dotenv").config();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_NAME));

// import all routes from routes directory
const setRoutes = require("./routes/routes");

// use all routes from routes directory
setRoutes(app);

app.get("/", (req, res) => {
    res.send("<h1>Well Come</h1>");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jrudo.mongodb.net/JWT_Authencation?retryWrites=true&w=majority`
    );
});
