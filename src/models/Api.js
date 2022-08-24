import { Schema, model } from "mongoose";

// Create each element and erases the version Key (__V).
const apiSchema = new Schema(
  {
    tokenName: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Api", apiSchema);
