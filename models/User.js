const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, "Every user must have a phone number"],
    unique: true,
  },
  purchases: {
    type: [String],
  },
});

module.exports = mongoose.model("User", UserSchema);
