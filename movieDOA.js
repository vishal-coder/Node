import { ObjectId } from "mongodb";
import { client } from "./index.js";

export async function updateMovieById(myquery, data) {
  console.log("udpate movie data", data);
  return await client.db("zen").collection("movies").updateOne(myquery, data);
}
export async function deleteMovieById(id) {
  return await client
    .db("zen")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
export function addMovie(data) {
  return client.db("zen").collection("movies").insertMany(data);
}

export function addSingleMovie(data) {
  return client.db("zen").collection("movies").insertOne(data);
}

export function getMovieById(id) {
  return client
    .db("zen")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}
export async function getAllMovies(request) {
  return await client
    .db("zen")
    .collection("movies")
    .find(request.query)
    .toArray();
}

export function createUser(data) {
  return client.db("zen").collection("uers").insertOne(data);
}
