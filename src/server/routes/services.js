const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", function (req, res) {
    const options = {
        method: "GET",
        url: "https://streaming-availability.p.rapidapi.com/get",
        params: {
            tmdb_id: `movie/${req.query.id}`,
            output_language: "en",
        },
        headers: {
            "X-RapidAPI-Key": `${process.env.RAPIDAPI_KEY}`,
            "X-RapidAPI-Host": `${process.env.RAPIDAPI_HOST}`,
        },
    };

    axios
        .request(options)
        .then(function (response) {
            res.send(response.data.result.streamingInfo);
        })
        .catch(function (error) {
            res.send({
                success: false,
                error: "Movie not found, please try again",
                status: 404,
            });
        });
});

module.exports = router;
