import { Router } from "express";
import { searchTitle, searchGenre, addRating, getRatings } from "../models/movies.js";
import { verifyToken } from "../util/auth.js";

const router = new Router();

router.get("/search/title/:title", searchTitle());

router.get("/search/genre/:genre", verifyToken, searchGenre());

router.post("/movie/rating", verifyToken, addRating());

router.get("/ratings", verifyToken, getRatings());
// };

export default router;
