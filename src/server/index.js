const express = require("express");
const app = express(); // create express app
const path = require("path");

// add middlewares
app.use(express.static(path.join(__dirname, "..", "app", "dist")));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "app", "dist", "index.html"));
});

// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5001");
});
