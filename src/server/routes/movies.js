const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/latest", function (req, res) {
    axios
        .get(
            `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_KEY}`
        )
        .then(function (response) {
            res.send({ total_movies: response.data.id });
        });
});

router.get("/randomId", function (req, res) {
    axios
        .get(`http://127.0.0.1:5000/api/movies/latest`)
        .then(function (response) {
            const randomId = Math.floor(
                Math.random() * response.data.total_movies
            );
            res.send({ randomId: randomId });
        });
});

router.get("/movieDetails/:id", function (req, res) {
    axios
        .get(
            `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.TMDB_KEY}`
        )
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            // handle error
            res.send(error.response.data);
        });
});

router.get("/externalID/:id", function (req, res) {
    axios
        .get(
            ` https://api.themoviedb.org/3/movie/${req.params.id}/external_ids?api_key=${process.env.TMDB_KEY}`
        )
        .then(function (response) {
            res.send({ imdbid: response.data.imdb_id });
        });
});

router.get("/randomMovie", function (req, res) {
    axios
        .get(`http://127.0.0.1:5000/api/movies/randomId`)
        .then(function (response) {
            axios
                .get(
                    `http://127.0.0.1:5000/api/movies/movieDetails/${response.data.randomId}`
                )
                .then(function (response) {
                    if (response.data?.status_code === 34) {
                        res.send({ error: "Movie not found, please try again", status: 404 })
                    } else {
                        res.send(response.data);
                    }
                });
        });
});

module.exports = router;
