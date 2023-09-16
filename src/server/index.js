const express = require("express");
const app = express(); // create express app
const path = require("path");
const cors = require("cors");
const logger = require("morgan");

const ipRouter = require("./routes/ip");
const moviesRouter = require("./routes/movies");
const tvRouter = require("./routes/tv");
const servicesRouter = require("./routes/services");
const awsRouter = require("./routes/aws");

// add middlewares
app.use(express.static(path.join(__dirname, "..", "app", "dist")));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("combined"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "app", "dist", "index.html"));
});
app.get("/movie", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "app", "dist", "index.html"));
});
app.get("/tv", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "app", "dist", "index.html"));
});
app.get("/example", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "app", "dist", "index.html"));
});

// Routes
app.use("/api/ip", ipRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/tv", tvRouter);
app.use("/api/services", servicesRouter);
app.use("/api/aws", awsRouter);

// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5001");
});
