import { InferSchemaType, model, Schema, Types } from "mongoose";

const subtaskSchema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
});

type Subtask = InferSchemaType<typeof subtaskSchema>;

export default model<Subtask>("Subtask", subtaskSchema);
