import express from "express";
import env from "./utils/validateEnv";

const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log("Listening")
})

app.get("/", (req, res, next) => {
  res.status(200).json("Congrats, you just achieved something")
})