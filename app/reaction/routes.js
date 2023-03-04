import express from "express";
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

// Route for deleting a reaction by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedReaction = await reactionController.deleteById(req.params.id);
    if (!deletedReaction) {
      return res.status(404).json({ message: "Reaction not found" });
    }
    res.json(deletedReaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
