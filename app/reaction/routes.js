import express from "express";
import UserController from "../user/controller.js";
import reactionController from "./controller.js";

const router = express.Router();

// Route for creating a new reaction
router.post("/post", async (req, res) => {
  try {
    const newReaction = await reactionController.createNewReaction(req.body);
    res.json(newReaction);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Delete a reaction
router.delete(
  "/:username/thoughts/:thoughtId/reactions/:reactionId",
  async (req, res) => {
    try {
      const user = await UserController.show(req.params.username);
      const thought = user.recentThoughts.id(req.params.thoughtId);
      if (!thought) {
        throw new Error("Thought not found");
      }
      thought.recentReactions.id(req.params.reactionId).remove();
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
export default router;
