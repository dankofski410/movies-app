import { Router } from "express";
import { searchTitle, searchGenre } from "../models/movies";
import auth, { verifyToken } from "../util/auth";
console.log(auth);

// export default function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
//     next();
//   });

const router = new Router();

router.get("/search/title/:title", searchTitle());

router.get("/search/genre/:genre", verifyToken, searchGenre());
// };

module.exports = router;
