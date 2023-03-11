import { InferSchemaType, model, Schema, Types } from "mongoose";
import Column from "./column";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  column: { type: Types.ObjectId, ref: Column },
});

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task", taskSchema);
