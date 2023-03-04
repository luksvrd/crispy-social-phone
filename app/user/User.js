import { model, Schema } from "mongoose";
import { ThoughtSchema } from "../thought/Thought.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,

      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,

      required: true,
      trim: true,
      unique: true,
      validate(emailVal) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailVal);
      },
    },

    // 10 most recent thoughts
    recentThoughts: [ThoughtSchema],
    // embedded document array
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    new: true,
    runValidators: true,
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
  }
);

// Adding a friend to a users friends list
UserSchema.methods.addFriend = function (friendId) {
  // Does user already have this friend?
  if (this.friends.includes(friendId)) {
    return;
  }
  // Add friend to users friends list
  this.friends.push(friendId);
  // save user in db
  return this.save();
};

// Adding a thought to a users recent thoughts
UserSchema.methods.addThought = function (thought) {
  // Add thought to users recent thoughts at the beginning
  this.recentThoughts.unshift(thought);

  return this.save();
};

// Adding reaction to a users recent reaction for a specific thought
UserSchema.methods.addReaction = function (reaction, thoughtId) {
  const thought2update = this.recentThoughts.find((recentThought) =>
    recentThought._id.equals(thoughtId)
  );

  if (thought2update) {
    thought2update.recentReactions.unshift(reaction);
    return this.save();
  }
};

// Update recent reactions once a user removes a reaction
UserSchema.methods.removeReaction = async function (reactionId, thoughtId) {
  const thought2update = this.recentThoughts.find((recentThought) =>
    recentThought._id.equals(thoughtId)
  );

  if (thought2update) {
    const reactionIndex = thought2update.recentReactions.findIndex((reaction) =>
      reaction._id.equals(reactionId)
    );
    if (reactionIndex !== -1) {
      // Remove the reaction from the recentReactions array
      thought2update.recentReactions.splice(reactionIndex, 1);
      await this.save();
    }
  }
};

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

UserSchema.methods.removeThought = async function (thoughtId) {
  const thoughtIndex = this.recentThoughts.findIndex((thought) =>
    thought._id.equals(thoughtId)
  );
  if (thoughtIndex !== -1) {
    // Remove the thought from the recentThoughts array
    this.recentThoughts.splice(thoughtIndex, 1);
    await this.save();
  }
};

export default model("User", UserSchema);
