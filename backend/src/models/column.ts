import { InferSchemaType, model, Schema, Types } from "mongoose";
import Task from "./Task";

export const columnSchema = new Schema({
  name: { type: String, required: true },
  tasks: [Task.schema],
});

type Column = InferSchemaType<typeof columnSchema>;

export default model<Column>("Column", columnSchema);
