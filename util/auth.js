// const jwt = require("jsonwebtoken");
// const config = require("../config/auth");
//const config = require("../config/auth");
// import verify from "jsonwebtoken";
// import { secret } from "../config/auth";
import jwt from "jsonwebtoken";
const { verify } = jwt;

// const db = require("../models");
// const User = db.user;

export function verifyToken(req, res, next) {
  //let token = req.session.token;
  let headers = req.headers;
  let token = headers.token;

  // let token = req.session.token;
  // let headers = req.headers;

  // if (!token) {
  //   let token = headers["x-access-token"];
  //   if (!token) {
  //     return res.status(403).send({
  //       message: "No token provided!",
  //     });
  //   }
  // }

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
}

// const auth = {
//   verifyToken,
// };
// module.exports = auth;
