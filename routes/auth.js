const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

router.get("/decode/:id", function(req, res, next) {
    try {
        console.log("doing")
        const token = req.params.id;
        console.log(token)
        const tokenDecoded = jwt.verify(token, "testSecret12345");
        return res.json(tokenDecoded);
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error
        });
    }
});

module.exports = router;
