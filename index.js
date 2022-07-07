const express = require("express");
const app = express();
app.get("/", (req, res) => {
  console.log("request made", req);
  res.send("Hello World");
});

app.listen(3000);
