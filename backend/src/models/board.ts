import { InferSchemaType, model, Schema, Types } from "mongoose";
import Column from "./Column";

const boardSchema = new Schema({
  name: { type: String, required: true },
  columns: [Column.schema],
});

type Board = InferSchemaType<typeof boardSchema>;

export default model("Board", boardSchema);
