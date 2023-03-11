import { InferSchemaType, model, Schema, Types } from "mongoose";
import Task from "./task";

const subtaskSchema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  task: { type: Types.ObjectId, ref: Task },
});

type Subtask = InferSchemaType<typeof subtaskSchema>;

export default model<Subtask>("Subtask", subtaskSchema);
