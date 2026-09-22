const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  streak: {
    lastCompleted: Date,
    days: {
      type: [Number],
      default: []
    }
  }
});

module.exports = mongoose.model("User", UserSchema);
