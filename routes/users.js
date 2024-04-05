const express = require("express");
const Users = require("../models/users");

const router = new express.Router();

router.post("/users/create", Users.createUser());

router.post("/users/login", Users.login());

module.exports = router;
