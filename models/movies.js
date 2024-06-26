const sql = require("./db.js");

exports.searchTitle = function () {
  return async function (req, res) {
    const title = req.params.title;
    sql.query(
      `SELECT * FROM movie WHERE title = '${title}'`,
      function (err, result) {
        if (err) throw err;
        console.log("Returned data");
        res.send(result[0]);
      }
    );
  };
};

exports.searchGenre = function () {
  return async function (req, res) {
    const genre = req.params.genre;
    sql.query(
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
};
