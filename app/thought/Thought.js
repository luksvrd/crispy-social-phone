import dayjs from "dayjs";
import mongoose, { Schema, model } from "mongoose";
import { ReactionSchema } from "../reaction/Reaction.js";

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

ThoughtSchema.methods.addReaction = function (reaction) {
  // Add reaction to thoughts recent reactions at the beginning of the array
  this.recentReactions.unshift(reaction);

  return this.save();
};

ThoughtSchema.virtual("reactionCount").get(async function () {
  // Find all Reactions where the thoughtID matches the current thought's _id
  const reactions = await mongoose.models.Reaction.find({
    thoughtID: this._id,
  });
  // Return the length of the array
  return reactions.length;
});

export default model("Thought", ThoughtSchema);
