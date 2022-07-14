import { Schema, model } from "mongoose";

// Create each element and add time (created and updated) and erases the version Key (__V).
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    userID: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Task", taskSchema);
