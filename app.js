// imports
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const logger = require("morgan");
const dotenv = require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const passportSteam = require("passport-steam");
const SteamStretegy = passportSteam.Strategy;

const STEAM_KEY = process.env.STEAM_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET;

const authRouter = require("./routes/auth");

const port = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log("Listening, on port " + port);
});

app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 3600000
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new SteamStretegy(
        {
            returnURL: "http://localhost:" + port + "/api/auth/steam/return",
            realm: "http://localhost:" + port + "/",
            apiKey: STEAM_KEY
        },
        function(identifier, profile, done) {
            process.nextTick(function() {
                profile.identifier = identifier;
                return done(null, profile);
            });
        }
    )
);

app.use(passport.initialize());

app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.get("/", (req, res) => {
    const token = jwt.sign(req.user, "testSecret12345");
    res.redirect(`http://localhost:5173?user=${token}`);
});

app.get(
    "/api/auth/steam",
    passport.authenticate("steam", { failureRedirect: "/" }),
    function(req, res) {
        res.redirect("/");
    }
);
app.get(
    "/api/auth/steam/return",
    passport.authenticate("steam", { failureRedirect: "/" }),
    function(req, res) {
        res.redirect("/");
    }
);

module.exports = app;
