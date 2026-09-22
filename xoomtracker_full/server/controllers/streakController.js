const User = require("../models/User");

function getStartOfWeek(date) {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
}

exports.markComplete = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const now = new Date();
    const today = now.getDay();
    const weekdayIndex = today === 0 ? 6 : today - 1;
    const currentWeekStart = getStartOfWeek(now);

    if (!user.streak) {
      user.streak = { lastCompleted: null, days: [] };
    }

    if (user.streak.lastCompleted) {
      const lastCompleted = new Date(user.streak.lastCompleted);

      if (lastCompleted < currentWeekStart) {
        user.streak.days = [];
      }
    }

    if (!user.streak.days.includes(weekdayIndex)) {
      user.streak.days.push(weekdayIndex);
    }

    user.streak.lastCompleted = now;

    await user.save();
    res.json(user.streak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user.streak || { lastCompleted: null, days: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
