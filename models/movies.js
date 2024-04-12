// const sql = require("./db.js");
import connection from "./db.js";

export function searchTitle() {
  return async function (req, res) {
    const title = req.params.title;
    connection.query(
      `SELECT * FROM movie WHERE title = '${title}'`,
      function (err, result) {
        if (err) throw err;
        console.log("Returned data");
        res.send(result[0]);
      }
    );
  };
}

export function searchGenre() {
  return async function (req, res) {
    const genre = req.params.genre;
    connection.query(
      `SELECT * FROM movie m
      INNER JOIN movie_genres mg ON m.movie_id = mg.movie_id
      INNER JOIN genre g ON g.genre_id = mg.genre_id
      WHERE g.genre_name = '${genre}'`,
      function (err, result) {
        if (err) throw err;
        console.log("Returned data");
        res.send(result);
        console.log("USER ID", req.userId);
      }
    );
  };
}
