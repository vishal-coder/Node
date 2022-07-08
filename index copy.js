const { response } = require("express");
const fs = require("fs");
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  console.log("request made", req);
  res.send("Hello World");
});

//API Movies
//express converting js object to JSON and sending over HTTP
const { movieData } = require("./movies");
app.get("/movies", (req, res) => {
  console.log("request made");
  res.send(movieData);
});

app.get("/movies/:id", (req, res) => {
  console.log("request made", req.params);
  const { id } = req.params;
  movie = movieData.find((mv) => mv.id === id);

  movie ? res.send(movie) : res.redirect("../404");
});

app.get("/404", (req, res) => {
  let respObj = "";
  console.log("request made");
  fs.readdir("./", (err, files) => {
    respObj += "Files in directory are\n";
    files.forEach((file) => {
      respObj += file + "<br>";
    });

    res.send(respObj);
  });
});

app.listen(3000, () => {
  console.log("Listening to requests....");
});

var timestamp = new Date().getTime();
let ts = Date.now();
console.log(timestamp);
console.log(ts);
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hrs = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
console.log(
  year + "-" + month + "-" + date + " " + hrs + ":" + minutes + ":" + seconds
);

fs.readdir("./Backup", (err, files) => {
  let str = " this is file list";
  files.forEach((file) => {
    str += file;
    console.log(file);
    console.log(str);
  });
});
