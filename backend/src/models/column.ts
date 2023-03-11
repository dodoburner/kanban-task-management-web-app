import { InferSchemaType, model, Schema, Types } from "mongoose";
import Board from "./board";

const columnSchema = new Schema({
  name: { type: String, required: true },
  board: { type: Types.ObjectId, ref: Board },
});

type Column = InferSchemaType<typeof columnSchema>;

export default model<Column>("Column", columnSchema);
