import express from "express";
// import reactionRoutes from "./reaction/routes.js";
import thoughtRoutes from "./thought/routes.js";
import userRouter from "./user/routes.js";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/thoughts", thoughtRoutes);
// app.use("/reactions", reactionRoutes);

export default () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};
