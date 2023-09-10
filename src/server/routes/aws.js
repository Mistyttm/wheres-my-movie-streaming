const AWS = require("aws-sdk");
const express = require("express");
const router = express.Router();
const axios = require("axios");

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: "ap-southeast-2",
});

module.exports = router;
