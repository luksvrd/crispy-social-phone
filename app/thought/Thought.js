import dayjs from "dayjs";
import mongoose, { Schema, model } from "mongoose";
import { ReactionSchema } from "../reaction/Reaction.js";
import User from "../user/User.js";

export const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // dayjs custom getter
    createdAt: {
      type: Date,
      default: Date.now,
      get(createdAtVal) {
        return dayjs(createdAtVal).format("MMM DD, YYYY [at] hh:mm a");
      },
    },
    // Thoughts only associated with a single user
    username: {
      type: String,
      required: true,
    },

    // 10 reaction limit
    recentReactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    versionKey: false,
  }
);

// Adding a reaction to a thoughts recent reactions
ThoughtSchema.methods.addReaction = function (reaction) {
  // Add reaction to thoughts recent reactions at the beginning of the array
  this.recentReactions.unshift(reaction);

  return this.save();
};

// Update a users recent thoughts array when a thought is updated
ThoughtSchema.pre("findOneAndUpdate", async function (next) {
  const updatedThought = this.getUpdate().$set;
  const thoughtId = updatedThought._id;
  const userId = updatedThought.userId;

  // Find the user that has the updated thought
  const user = await User.findOne({ _id: userId });

  // Find the index of the thought in the user's recentThoughts array
  const thoughtIndex = user.recentThoughts.findIndex(
    (thought) => thought._id.toString() === thoughtId.toString()
  );

  // If the thought is found in the user's recentThoughts array, update it
  if (thoughtIndex !== -1) {
    user.recentThoughts.set(thoughtIndex, updatedThought);
    await user.save();
  }

  next();
});

// Update a users recent thoughts array when a thought is deleted
ThoughtSchema.pre("findOneAndDelete", async function (next) {
  const thoughtId = this.getQuery()._id;
  const userId = this.getQuery().userId;

  // Find the user that has the deleted thought
  const user = await User.findOne({ _id: userId });

  // Find the index of the thought in the user's recentThoughts array
  const thoughtIndex = user.recentThoughts.findIndex(
    (thought) => thought._id.toString() === thoughtId.toString()
  );

  // If the thought is found in the user's recentThoughts array, remove it
  if (thoughtIndex !== -1) {
    user.recentThoughts.splice(thoughtIndex, 1);
    await user.save();
  }

  next();
});

ThoughtSchema.virtual("reactionCount").get(async function () {
  // Find all Reactions where the thoughtID matches the current thought's _id
  const reactions = await mongoose.models.Reaction.find({
    thoughtID: this._id,
  });
  // Return the length of the array
  return reactions.length;
});

export default model("Thought", ThoughtSchema);
