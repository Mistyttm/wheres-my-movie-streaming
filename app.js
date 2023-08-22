// imports
var express = require("express");
var passport = require("passport");
var session = require("express-session");
var passportSteam = require("passport-steam");
var SteamStretegy = passportSteam.Strategy;
var app = express();

var port = 3000;

app.listen(port, () => {
    console.log("Listening, port " + port);
});
