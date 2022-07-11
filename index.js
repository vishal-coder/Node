// import { MongoClient } from "mongodb";
// const { MongoClient } = require("mongodb");
// const { response } = require("express");
import { MongoClient } from "mongodb";
import express from "express";

import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
//const fs1 = require("fs");
// const express = require("express");
const app = express();

//app.use -> Intercepts request  and applies express.json()
//express.json() is a built in middleware function in Express
//It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
// const MONGO_URL = "mongodb://localhost";
// const MONGO_URL = "mongodb://127.0.0.1"; //  nodejs - 16+
const MONGO_URL = process.env.MONGO_URL;

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

app.get("/movies", async function (req, res) {
  console.log("request made");
  //cursor - pagination | cursor -> array | toArray()
  const movies = await client.db("zen").collection("movies").find({}).toArray();
  res.send(movies);
});

app.get("/movies/:id", async (req, res) => {
  console.log("request made", req.params);
  const { id } = req.params;

  const movie = await client.db("zen").collection("movies").findOne({ id: id });

  // movie = movieData.find((mv) => mv.id === id);
  movie ? res.send(movie) : res.status(404).send({ msg: "Movie Not Found" });
});

//middleware(inbuid) - express.json();
app.post("/movies", express.json(), async function (req, res) {
  const data = req.body;
  console.log("data", data);
  const result = await client.db("zen").collection("movies").insertMany(data);
  res.send(result);
});

app.get("/404", (req, res) => {
  let respObj = "";
  console.log(" this is 404 ");
});

app.listen(3000, () => {
  console.log("Listening to requests....");
});
