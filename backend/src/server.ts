import "dotenv/config";
import env from "./utils/validateEnv";
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Database connected");
    app.listen(env.PORT, () => {
      console.log("Listening on port " + env.PORT);
    });
  })
  .catch(console.error);
