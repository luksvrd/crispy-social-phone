import express from "express";
import userRouter from "./user/routes.js";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use("/user", userRouter);

export default () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};
