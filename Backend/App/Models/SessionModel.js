import mongoose from "mongoose";

const sessionschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
    userName: {
      type: String,
      required: true,
    },
});

const session = mongoose.model("Session", sessionschema);
export default session;
