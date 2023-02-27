import { model, Schema } from "mongoose";

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
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailVal);
      },
    },
  },
  {
    new: true,
    runValidators: true,
    versioinKey: false,
  }
);

export default model("User", UserSchema);
