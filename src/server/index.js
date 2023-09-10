const express = require("express");
const app = express(); // create express app
const path = require("path");
const cors = require("cors");
const logger = require("morgan");

const ipRouter = require("./routes/ip");
const moviesRouter = require("./routes/movies");
const servicesRouter = require("./routes/services");

// add middlewares
app.use(express.static(path.join(__dirname, "..", "app", "dist")));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "app", "dist", "index.html"));
});

app.get("/api/hello", (req, res) => {
    res.send({ express: "Hello From Express" });
});

// Routes
app.use("/api/ip", ipRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/services", servicesRouter);

// start express server on port 5000
app.listen(5001, () => {
    console.log("server started on port 5001");
});
