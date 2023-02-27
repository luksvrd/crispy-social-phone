import { model, Schema } from "mongoose";
import { ThoughtSchema } from "../thought/Thought.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,

      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,

      required: true,
      trim: true,
      unique: true,
      validate(emailVal) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailVal);
      },
    },

    // 10 most recent thoughts
    recentThoughts: [ThoughtSchema],
    // embedded document array
    frinds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    new: true,
    runValidators: true,
    versioinKey: false,
  }
);

export default model("User", UserSchema);
