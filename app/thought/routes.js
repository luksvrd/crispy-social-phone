import express from "express";
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

// Update a thought by id
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { thoughtText } = req.body;
  try {
    const thought = await thoughtController.show(id);
    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
    } else {
      thought.thoughtText = thoughtText;
      await thought.save();
      res.status(200).json(thought);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a thought by id
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const thought = await thoughtController.show(id);
    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
    } else {
      await thought.delete();
      res.json({ message: "Thought sucessfully deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
