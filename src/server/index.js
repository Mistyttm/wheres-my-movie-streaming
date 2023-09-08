const express = require("express");
const app = express(); // create express app
const path = require("path");

// add middlewares
app.use(express.static(path.join(__dirname, "..", "app", "dist")));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "app", "dist", "index.html"));
});

app.get("/api/hello", (req, res) => {
    res.send({ express: "Hello From Express" });
});

// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5001");
});
