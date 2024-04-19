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

export function addRating() {
  return async function (req, res) {

    // req.body will come from the front-end when the user selects a movie and gives a rating
    const movie_id = req.body.movie_id;
    const user_id = req.userId;
    const rating = req.body.rating;

    // Added index to movie_id so it will not duplicate if user changes rating
    connection.query(
      `INSERT INTO user_rating (user_id, movie_id, movie_rating) VALUES
      (${user_id}, ${movie_id}, ${rating})
      ON DUPLICATE KEY UPDATE movie_rating = ${rating};`,
      function (err, result) {
        if (err) throw err;
        console.log("Returned data");
        res.send({ success: 1, message: "Rating added for " + movie_id, data: result });
      }
    );
  };
}

export function getRatings() {
  return async function (req, res) {
    const user_id = req.userId;
    connection.query(
      `SELECT m.title, ur.movie_rating FROM movie m
      INNER JOIN user_rating ur ON m.movie_id = ur.movie_id
      WHERE ur.user_id = '${user_id}'`,
      function (err, result) {
        if (err) throw err;
        console.log("Returned data");
        res.send(result);
      }
    );
  };
}
