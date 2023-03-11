import { InferSchemaType, model, Schema, Types } from "mongoose";
import Subtask from "./Subtask";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  subtasks: [Subtask.schema]
});

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task", taskSchema);
