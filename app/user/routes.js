import { Router } from "express";
import UserController from "./controller.js";

const router = Router();

router.get("/index", (_, res) => {
  UserController.index()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

// router.get("/", (_, res) => {
//   UserController.index()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(500).json(err));
// });

// router.get("/:username", (req, res) => {
//   UserController.show(req.params.username)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       return res.json(user);
//     })
//     .catch((err) => res.status(500).json(err));
// });

export default router;
