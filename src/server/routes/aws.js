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

// Create an S3 client
const s3 = new AWS.S3();

// Specify the S3 bucket and object key
const bucketName = "n10881131-page-counter";
const objectKey = "counter.json";

router.get("/write", (req, res) => {
    async function createS3bucket() {
        try {
            await s3.createBucket( { Bucket: bucketName }).promise();
            res.send({message: `Created bucket: ${bucketName}`});
        } catch(err) {
            if (err.statusCode === 409) {
                res.send({ message: `Bucket already exists: ${bucketName}` });
            } else {
                res.send({ message: `Error creating bucket`, error: `${err}`});
            }
        }
    }

    createS3bucket();
});

router.get("/visit", (req, res) => {

    // Upload the JSON data to S3
    async function uploadJsonToS3(jsonData) {
        const params = {
            Bucket: bucketName,
            Key: objectKey,
            Body: JSON.stringify(jsonData), // Convert JSON to string
            ContentType: "application/json", // Set content type
        };

        try {
            await s3.putObject(params).promise();
            res.send({ success: true, message: "JSON file uploaded successfully." });
        } catch (err) {
            res.send({message: "Error uploading JSON file", error: err});
        }
    }

    axios.get(`http://127.0.0.1:5000/api/aws/read`)
    .then(function (response) {
        // JSON data to be written to S3
        const jsonTemplate = {
            count: response.data.data.count + 1,
        };

        uploadJsonToS3(jsonTemplate);
    }).catch(function (error) {
        res.send({ message: "Error reading JSON file", error: error });
    });
});

router.get("/read", (req, res) => {
    // Retrieve the object from S3
    async function getObjectFromS3() {
        const params = {
            Bucket: bucketName,
            Key: objectKey,
        };

        try {
            const data = await s3.getObject(params).promise();
            // Parse JSON content
            const parsedData = JSON.parse(data.Body.toString("utf-8"));
            res.send({ message: "Parsed JSON data", data: parsedData});
        } catch (err) {
            res.send({ message: "Error", error: err });
        }
    }

    getObjectFromS3();
});


module.exports = router;
