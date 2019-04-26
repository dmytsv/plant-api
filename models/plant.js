const mongoose = require("mongoose");
const { Schema } = mongoose;

const plantSchema = new Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model("plant", plantSchema);
