import express from "express";
import UserController from "../user/controller.js";
import thoughtController from "./controller.js";

const router = express.Router();

// Get all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughts = await thoughtController.index();
    res.status(200).json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single thought by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const thought = await thoughtController.show(id);
    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
    } else {
      res.status(200).json(thought);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new thought
router.post("/post", async (req, res) => {
  const { thoughtText, username } = req.body;
  try {
    const newThought = await thoughtController.createNewThought({
      thoughtText,
      username,
    });
    res.status(201).json(newThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a thought
router.put("/:username/thoughts/:thoughtId", async (req, res) => {
  try {
    const user = await UserController.show(req.params.username);
    const thought = user.recentThoughts.id(req.params.thoughtId);
    if (!thought) {
      throw new Error("Thought not found");
    }
    thought.set(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a thought
router.delete("/:username/thoughts/:thoughtId", async (req, res) => {
  try {
    const user = await UserController.show(req.params.username);
    user.recentThoughts.id(req.params.thoughtId).remove();
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
