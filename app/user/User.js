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

UserSchema.methods.addThought = function (thought) {
  // Add thought to users recent thoughts at the beginning
  this.recentThoughts.unshift(thought);

  return this.save();
};

UserSchema.methods.addReaction = function (reaction, thoughtId) {
  const thought2update = this.recentThoughts.find((recentThought) =>
    recentThought._id.equals(thoughtId)
  );

  if (thought2update) {
    thought2update.recentReactions.unshift(reaction);
    return this.save();
  }
};

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

export default model("User", UserSchema);
