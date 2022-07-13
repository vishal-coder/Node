import { client } from "./index.js";

export async function updateMovieById(myquery, data) {
  return await client.db("zen").collection("movies").updateOne(myquery, data);
}
export async function deleteMovieById(id) {
  return await client.db("zen").collection("movies").deleteOne({ id: id });
}
export function addMovie(data) {
  return client.db("zen").collection("movies").insertMany(data);
}
export function getMovieById(id) {
  return client.db("zen").collection("movies").findOne({ id: id });
}
export async function getAllMovies(request) {
  return await client
    .db("zen")
    .collection("movies")
    .find(request.query)
    .toArray();
}
