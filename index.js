const express = require("express");
const app = express();
app.get("/", (req, res) => {
  console.log("request made", req);
  res.send("Hello World");
});

const { movieData } = require("./movies");
app.get("/movies", (req, res) => {
  console.log("request made", req);
  res.send(movieData);
});

app.listen(3000, () => {
  console.log("Listening to requests....");
});
