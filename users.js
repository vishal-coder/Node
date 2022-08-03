import express from "express";
import bcrypt from "bcrypt";
import { createUsersignup, getUserFromDB as getUserFromDB } from "./userDOA.js";
import jwt from "jsonwebtoken";
import { client } from "./index.js";
import Crypto from "crypto";
import nodemailer from "nodemailer";
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
  const { username, password, email } = req.body;
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
      email: email,
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

router.post("/forgotPassword", async function (req, res) {
  const { email } = req.body;
  const data = req.body;
  console.log(email);
  const isEmailValid = await client.db("zen").collection("users").findOne(data);
  console.log("isEmailValid", isEmailValid);
  if (!isEmailValid) {
    res.status(401).send({ message: "Invalid email address" });
  } else {
    let resetToken = Crypto.randomBytes(16).toString("hex");
    let hashedResetToken = await getHashedPassword(resetToken);
    console.log("resetToken", resetToken);
    console.log("hashedResetToken", hashedResetToken);
    let tokenUpdate = await client
      .db("zen")
      .collection("users")
      .updateOne(data, {
        $set: { token: hashedResetToken, createdAt: new Date() },
      });
    res.send({ message: "verification mail sent to your email address" });
  }
});

function sendPasswordResetMail(name, email, token) {
  const transporter = nodemailer.createTransport({
    host: "Gmail",
    port: 587,
    secure: process.env.NODE_ENV !== "development",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: "somebody@gmail.com",
    from: "support@myapp.com",
    subject: "Testing Email Sends",
    html: "<p>Sending some HTML to test.</p><br>" + +"<p></p>",
  };
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
export const usersRouter = router;
