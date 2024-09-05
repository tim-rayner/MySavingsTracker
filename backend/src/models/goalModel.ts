//We define the schema of the goal model here and export it as a model.
import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please enter a goal"],
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

export default mongoose.model("Goal", goalSchema);
