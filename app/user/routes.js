import { Router } from "express";
import UserController from "./controller.js";

const router = Router();

// Get all users
router.get("/", (_, res) => {
  // index() is a method on the controller, it gets all data from the database and returns
  UserController.index()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

// Get a user by username
router.get("/:username", (req, res) => {
  UserController.show(req.params.username)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    })
    .catch((err) => res.status(500).json(err));
});

// Create a new user
router.post("/", (req, res) => {
  UserController.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
});

// route to update a user
router.put("/:username", (req, res) => {
  const { username } = req.params;
  const { email } = req.body;
  UserController.show(username)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.email = email;
      return user.save();
    })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json(err));
});

// Delete a user
router.delete("/:username", (req, res) => {
  const { username } = req.params;
  UserController.show(username)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return user.remove();
    })
    .then(() => res.json({ message: "User deleted" }))
    .catch((err) => res.status(500).json(err));
});

// Add a friend to a user
router.post("/:username/friends/:friendId", (req, res) => {
  UserController.updatedByAddingFriend(req.params.username, req.params.friendId)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
});

// Delete a friend from a user
router.delete("/:username/friends/:friendId", async (req, res) => {
  const { username, friendId } = req.params;
  try {
    await UserController.deleteFriend(username, friendId);
    res.json({ message: "Friend deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
