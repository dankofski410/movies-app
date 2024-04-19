import { createConnection } from "mysql";
import dotenv from "dotenv";

dotenv.config();

// Create a connection to the database
const connection = createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default connection;
