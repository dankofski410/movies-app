const express = require("express");
const Movies = require("../models/movies");
const auth = require("../util/auth");
console.log(auth);

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
//     next();
//   });

const router = new express.Router();

router.get("/search/title/:title", Movies.searchTitle());

router.get("/search/genre/:genre", auth.verifyToken, Movies.searchGenre());
// };

module.exports = router;
