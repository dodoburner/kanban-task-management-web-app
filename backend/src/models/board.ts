import { InferSchemaType, model, Schema } from "mongoose";

const boardSchema = new Schema({
  name: { type: String, required: true }
});

type Board = InferSchemaType<typeof boardSchema>

export default model<Board>("Board", boardSchema);