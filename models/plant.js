const mongoose = require("mongoose");
const { Schema } = mongoose;

const plantSchema = new Schema({
  name: String,
  image: String,
  description: String,
  users: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      name: String
    }
  ]
});

module.exports = mongoose.model("plant", plantSchema);
