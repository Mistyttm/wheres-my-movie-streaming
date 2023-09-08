const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
    let ipAddress = req.socket.remoteAddress;
    if (ipAddress.substring(0, 7) == "::ffff:") {
        ipAddress = ipAddress.substring(7);
    }
    axios
        .get(`https://ipinfo.io/${ipAddress}?token=${process.env.IPINFO_KEY}`)
        .then(function (response) {
            // handle success
            if (response.data.city === undefined) {
                response.data.country = "au";
            }
            res.send({
                ip: response.data.ip,
                country: response.data.country.toLowerCase(),
            });
        });
});

module.exports = router;
