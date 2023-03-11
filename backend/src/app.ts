import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import boardsRouter from "./routes/boards";

const app = express();

app.use(express.json());

app.use("/api/boards", boardsRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = "An unknown error occured";
  let statusCode = 500;

  if (isHttpError(error)) {
    errorMsg = error.message;
    statusCode = error.status;
  }

  res.status(statusCode).json({ error: errorMsg });
});

export default app;
