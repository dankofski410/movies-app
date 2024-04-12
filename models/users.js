// const sql = require("./db.js");
//const config = require("../config/auth");
import connection from "./db.js";
import dotenv from "dotenv";

dotenv.config();

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// import { sign } from "jsonwebtoken";
// import { hashSync, compareSync } from "bcryptjs";
import pkg from "bcryptjs";
const { hashSync, compareSync } = pkg;
import jwt from "jsonwebtoken";
const { sign } = jwt;



export function createUser() {
  return async function (req, res) {
    const password = hashSync(req.body.password, 8);
    connection.query(
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

export function login() {
  return async function (req, res) {
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    let user;
    try {
      connection.query(
        `SELECT * FROM users WHERE username = '${username}'`,
        function (err, result) {
          if (err) throw err;
          console.log("Returned data");
          //console.log(result)
          user = result[0];
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }

          const passwordIsValid = compareSync(password, user.password);

          if (!passwordIsValid) {
            return res.status(401).send({
              message: "Invalid Password!",
            });
          }

          const token = sign({ id: user.user_id }, process.env.SECRET_KEY, {
            expiresIn: 86400, // 24 hours
          });

          console.log(token);

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

export async function logout (req, res) {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been logged out!",
    });
  } catch (err) {
    this.next(err);
  }
};
