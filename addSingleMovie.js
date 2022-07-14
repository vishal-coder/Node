import express from "express";
import { addSingleMovie } from "./movieDOA.js";

const router = express.Router();

router.post("/", express.json(), async function (req, res) {
  const data = req.body;
  console.log("data", data);
  const result = await addSingleMovie(data);
  res.send(result);
});

export const addSingleMovieRouter = router;
