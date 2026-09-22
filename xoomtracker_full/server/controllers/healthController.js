const Health = require("../models/Health");

exports.addEntry = async (req, res) => {
  try {
    const { workout, calories } = req.body;
    const trimmedWorkout = typeof workout === "string" ? workout.trim() : "";
    const calorieValue = Number(calories);

    if (!trimmedWorkout || calories === undefined || calories === "") {
      return res.status(400).json({ message: "Workout and calories are required." });
    }

    if (!Number.isFinite(calorieValue) || calorieValue < 0) {
      return res.status(400).json({ message: "Calories must be a non-negative number." });
    }

    const entry = new Health({
      userId: req.user.id,
      workout: trimmedWorkout,
      calories: calorieValue
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const entries = await Health.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
