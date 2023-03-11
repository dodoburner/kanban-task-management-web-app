import "dotenv/config";
import express from "express";
import boardsRouter from "./routes/boards";

const app = express();

app.use(express.json());

app.use("/api/boards", boardsRouter);

export default app;
