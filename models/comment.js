const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    username: String
  },
  plant: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "plant"
    }
  }
});

module.exports = mongoose.model("comment", commentSchema);
