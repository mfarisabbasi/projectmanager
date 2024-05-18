import { Schema, model, models } from "mongoose";

const workspaceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Workspace = models.Workspace || model("Workspace", workspaceSchema);

export default Workspace;
