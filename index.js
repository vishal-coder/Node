// import { MongoClient } from "mongodb";
// const { MongoClient } = require("mongodb");
// const { response } = require("express");
import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { moviesRouter } from "./movies.js";
import { addSingleMovieRouter } from "./addSingleMovie.js";
import { usersRouter } from "./users.js";

//const fs1 = require("fs");
// const express = require("express");
const app = express();

//app.use -> Intercepts request  and applies express.json()
//express.json() is a built in middleware function in Express
//It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json()); // <==== parse request body as JSON

app.use(cors());
// const MONGO_URL = "mongodb://localhost";
// const MONGO_URL = "mongodb://127.0.0.1"; //  nodejs - 16+
const MONGO_URL = process.env.MONGO_URL;


async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo DB connected,");
  return client;
}

export const client = await createConnection();

app.get("/", (req, res) => {
  console.log("request made", req);
  res.send("Default request made");
});

app.use("/addSingleMovie", addSingleMovieRouter);
app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
//API Movies
//express converting js object to JSON and sending over HTTP
// import movieData from "./movies";

app.listen(process.env.PORT, () => {
  console.log("Listening to requests....");
});
