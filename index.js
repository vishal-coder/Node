const express = require("express");
const app = express();
app.get("./GET", (req, res) => {
  console.log("request made", req);
});

app.listen(3000);
