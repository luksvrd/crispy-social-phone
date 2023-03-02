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

export default model("Reaction", ReactionSchema);
