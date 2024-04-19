import { Router } from "express";
import { createUser, login } from "../models/users.js";

const router = new Router();

router.post("/users/create", createUser());

router.post("/users/login", login());

export default router;
