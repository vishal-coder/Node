// import { MongoClient } from "mongodb";
// const { MongoClient } = require("mongodb");
// const { response } = require("express");
import { MongoClient } from "mongodb";
import express from "express";
import fs from "fs";
//const fs1 = require("fs");
// const express = require("express");
const app = express();

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = "mongodb://127.0.0.1"; //  nodejs - 16+

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo DB connected");
  return client;
}

const client = await createConnection();

app.get("/", (req, res) => {
  console.log("request made", req);
  res.send("Hello World");
});

//API Movies
//express converting js object to JSON and sending over HTTP
// import movieData from "./movies";

app.get("/movies", (req, res) => {
  console.log("request made");
  res.send(movieData);
});

app.get("/movies/:id", async (req, res) => {
  console.log("request made", req.params);
  const { id } = req.params;

  const movie = await client.db("zen").collection("movies").findOne({ id: id });

  // movie = movieData.find((mv) => mv.id === id);
  movie ? res.send(movie) : res.status(404).send({ msg: "Movie Not Found" });
});

app.get("/404", (req, res) => {
  let respObj = "";
  console.log(" this is 404 ");
});

app.listen(3000, () => {
  console.log("Listening to requests....");
});
