/** @format */
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { UserDocument } from './user.model';

export interface TaskDocument extends mongoose.Document {
  user: UserDocument['_id'];
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema(
  {
    TaskId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: true },
    body: { type: String, default: true },
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskDocument>('Task', TaskSchema);

export default Task;
