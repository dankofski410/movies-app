// const express = require("express");
// const Movies = require("../models/movies");
// const auth = require("../util/auth");
// console.log(auth);
import { Router } from "express";
import { searchTitle, searchGenre } from "../models/movies.js";
import { verifyToken } from "../util/auth.js";

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
//     next();
//   });

const router = new Router();

router.get("/search/title/:title", searchTitle());

router.get("/search/genre/:genre", verifyToken, searchGenre());
// };

export default router;
