const mongoose = require("mongoose");

const HealthSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  workout: {
    type: String,
    required: true,
    trim: true
  },
  calories: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Health", HealthSchema);
