import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export default () => {
  mongoose
    .connect("mongodb://localhost:27017/social-network")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connectiong to MongoDB", err.message);
    });
};
