import dayjs from "dayjs";
import { model, Schema } from "mongoose";

export const ReactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get(createdAtVal) {
        return dayjs(createdAtVal).format("MMM DD, YYYY [at] hh:mm a");
      },
    },
    // reaction associated with a single thought
    thoughtId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    versionKey: false,
  }
);

// Update a thoughts recent reactions array when a reaction is deleted. Using a pre hook because we need to find the reaction before it is deleted
ReactionSchema.pre("findOneAndDelete", async function (next) {
  const reactionId = this.get;
  const reaction = await this.findOne(this.getQuery());
  await reaction.populate("thoughtId").execPopulate();
  await reaction.thoughtId.recentReactions.pull(reactionId);
  await reaction.thoughtId.save();
  next();
});

export default model("Reaction", ReactionSchema);
