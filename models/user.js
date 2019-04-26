const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
  plant: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "plant"
    }
  }
});

userSchema.pre("save", async function(next) {
  const user = this;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = function(providedPassword, callback) {
  bcrypt.compare(providedPassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
