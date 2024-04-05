const sql = require("./db.js");
const config = require("../config/auth");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createUser = function () {
  return async function (req, res) {
    const password = bcrypt.hashSync(req.body.password, 8);
    sql.query(
      `INSERT INTO users (username, password, role, email) VALUES
      ('${req.body.username}', '${password}', '${req.body.role}', '${req.body.email}')`,
      function (err, result) {
        if (err) throw err;
        console.log("Returned data");
        res.send(result);
      }
    );
  };
};

exports.login = function () {
  return async function (req, res) {
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    let user;
    try {
      sql.query(
        `SELECT * FROM users WHERE username = '${username}'`,
        function (err, result) {
          if (err) throw err;
          console.log("Returned data");
          //console.log(result)
          user = result[0];
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }

          const passwordIsValid = bcrypt.compareSync(password, user.password);

          if (!passwordIsValid) {
            return res.status(401).send({
              message: "Invalid Password!",
            });
          }

          const token = jwt.sign({ id: user.user_id }, config.secret, {
            expiresIn: 86400, // 24 hours
          });

          console.log(token)

          //req.session.token = token;

          return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken: token,
          });
        }
      );
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
};

exports.logout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been logged out!",
    });
  } catch (err) {
    this.next(err);
  }
};
