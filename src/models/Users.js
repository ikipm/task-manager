import { Schema, model } from "mongoose";

// Create each element and erases the version Key (__V).
const usersSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Users", usersSchema);
