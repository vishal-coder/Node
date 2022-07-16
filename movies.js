import express from "express";
import { ObjectId } from "mongodb";
import { auth } from "./middleware/auth.js";
import {
  getAllMovies,
  getMovieById,
  addMovie,
  deleteMovieById,
  updateMovieById,
} from "./movieDOA.js";

const router = express.Router();

router.get("/", auth, async function (request, res) {
  console.log("request made");

  console.log(request.query);
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }

  //cursor - pagination | cursor -> array | toArray()
  const movies = await getAllMovies(request);
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  console.log("request made get by id", req.params);
  const { id } = req.params;

  const movie = await getMovieById(id);

  // movie = movieData.find((mv) => mv.id === id);
  movie ? res.send(movie) : res.status(404).send({ msg: "Movie Not Found" });
});

//middleware(inbuid) - express.json();
router.post("/", express.json(), async function (req, res) {
  const data = req.body;
  console.log("data", data);
  const result = await addMovie(data);
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  console.log("request made", req.params);
  const { id } = req.params;

  const result = await deleteMovieById(id);

  // movie = movieData.find((mv) => mv.id === id);
  result.deletedCount > 0
    ? res.send(result)
    : res.status(404).send({ msg: "NOT DELETED. Movie Not Found." });
});

router.put("/:id", async (req, res) => {
  console.log("request made put method", req.params);
  console.log("request body request is -", req);
  console.log("request body", req.body);
  console.log("request req.params", req.params);
  const { id } = req.params;
  var myquery = { _id: ObjectId(id) };
  var data = { $set: req.body };

  const result = await updateMovieById(myquery, data);

  // movie = movieData.find((mv) => mv.id === id);
  console.log("update result", result);
  result
    ? res.send(result)
    : res.status(404).send({ msg: "NOT DELETED. Movie Not Found." });
});

router.get("/404", (req, res) => {
  let respObj = "";
  console.log(" this is 404 ");
});

export const moviesRouter = router;
