const connectToMongo = require("./db");
const express = require("express");

// database connection
connectToMongo();

// creating port
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(port, () => {
  console.log(`express server is running on the port http://localhost:${port}`);
});
