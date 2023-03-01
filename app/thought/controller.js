// import initDB from "../db-client.js";
import userController from "../user/controller.js";
import Thought from "./Thought.js";

const controller = {
  async createNewThought(newThought) {
    // Thought connected to a valid user?
    const thinkingUser = await userController.show(newThought.username);
    // If no user, throw an error
    if (!thinkingUser) {
      throw new Error("Invalid user");
    }
    // Create the thought
    const createdThought = await Thought.create(newThought);
    // Log the thought
    console.info(
      "Added thought to users recent thoughts",
      thinkingUser.username
    );

    thinkingUser.addThought(createdThought);
    // Return the thought
    return createdThought;
  },
  // Get all thoughts
  index() {
    return Thought.find();
  },
  // Get a single thought by id
  show(id) {
    return Thought.findById(id);
  },
};

// (Step #3) Run the below code to create thoughts. Have user & reaction creation code commented out.

// await initDB();

// controller
//   .createNewThought({
//     thoughtText: "I'm thinking about thinking",
//     username: "john",
//   })
//   .then((thought) => {
//     console.log(thought);
//   })
//   .catch((err) => {
//     console.error(err.message);
//   });

export default controller;
