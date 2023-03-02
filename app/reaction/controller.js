// import initDB from "../db-client.js";
import thoughtController from "../thought/controller.js";
import userController from "../user/controller.js";
import Reaction from "./Reaction.js";

const controller = {
  async createNewReaction(newReaction) {
    // connected to a valid thought & user (the user thats reacting)?
    const thought = await thoughtController.show(newReaction.thoughtId);
    const reactingUser = await userController.show(newReaction.username);

    if (!thought || !reactingUser) {
      throw new Error("Invalid thoughtId or username");
    }

    const createdReaction = await Reaction.create(newReaction);

    console.info("Created reaction added to thought reactions", thought._id);
    thought.addReaction(createdReaction);

    const ogThinkingUser = await userController.show(thought.username);
    console.info("Reaction added to original thinker's top 10 reactions");

    ogThinkingUser.addReaction(createdReaction, thought._id);
    // Return the reaction
    return createdReaction;
  },
};

// (Step #4) Run the below code to create reactions. Copy the 'thoughtId' from mongoDB and paste. Comment out the creation code in thought/controller.js and user/controller.js 1st!

// await initDB();

// controller
//   .createNewReaction({
//     reactionBody: "This is my initial reaction",
//     // username doing the reacting
//     username: "jane",
//     thoughtId: "63ffbb8baaabe40b0f45ca0c",
//   })
//   .then((reaction) => {
//     console.log(reaction);
//   })
//   .catch((err) => {
//     console.error(err.message);
//   });
