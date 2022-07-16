import express from "express";
import bcrypt from "bcrypt";
import { createUsersignup, getUserFromDB as getUserFromDB } from "./userDOA.js";
import jwt from "jsonwebtoken";
const router = express.Router();
router.use(express.json());

async function getHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashed pass is", hashedPassword, salt);
  return hashedPassword;
}

//middleware(inbuid) - express.json();
router.post("/signup", express.json(), async function (req, res) {
  console.log("inside user signup");
  const { username, password } = req.body;
  const isuserexist = await getUserFromDB({ username: username });
  console.log("isuserexist", isuserexist);
  if (password.length < 8) {
    res
      .status(400)
      .send({ message: "Password length should be atleast 8 characters" });
  } else if (isuserexist) {
    res.status(400).send({ message: "usrename already exists" });
  } else {
    const data = req.body;
    let hashedPassword = await getHashedPassword(password);
    console.log("data", data);
    const result = await createUsersignup({
      username: username,
      password: hashedPassword,
    });
    res.send(result);
  }
});

router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  console.log("username", username);
  const userFromDB = await getUserFromDB({ username: username });
  console.log("userFromDB", userFromDB);
  if (!userFromDB) {
    res.status(400).send({ message: "Invalid Credentials" });
  } else {
    const storedPassword = userFromDB.password;
    const isPasswordMathced = await bcrypt.compare(password, storedPassword);
    console.log(isPasswordMathced);
    if (isPasswordMathced) {
      var token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      res.send({ message: "user logged successfully", token: token });
    } else {
      res.status(400).send({ message: "Invalid Credentials" });
    }
  }
});

export const usersRouter = router;
