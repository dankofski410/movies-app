import express, { json, urlencoded } from "express";
import cors from "cors";
import moviesRouter from "./routes/movies.js";
import usersRouter from "./routes/users.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Movie App" });
});

app.use(json());
app.use(moviesRouter);
app.use(usersRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
