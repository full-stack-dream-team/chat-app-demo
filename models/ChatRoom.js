const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatRoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    whitelist: Array,
    blacklist: Array,
  },
  { timestamps: true }
);

mongoose.model("ChatRoom", chatRoomSchema);
