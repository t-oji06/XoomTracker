import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { addHealthEntry, getHealthEntries, getStreak, markStreak } from "../services/api";

function Dashboard() {
  const [streakDays, setStreakDays] = useState([]);
  const [entries, setEntries] = useState([]);
  const [workout, setWorkout] = useState("");
  const [calories, setCalories] = useState("");
  const [status, setStatus] = useState("");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const loadDashboard = async () => {
    try {
      const [streakResponse, entriesResponse] = await Promise.all([getStreak(), getHealthEntries()]);
      setStreakDays(streakResponse.data.days || []);
      setEntries(entriesResponse.data || []);
    } catch (error) {
      setStatus(error.response?.data?.message || "Unable to load dashboard data.");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleComplete = async () => {
    try {
      await markStreak();
      setStatus("Today's progress has been added to your streak.");
      loadDashboard();
    } catch (error) {
      setStatus(error.response?.data?.message || "Unable to update streak.");
    }
  };

  const handleAddEntry = async (event) => {
    event.preventDefault();

    if (!workout.trim() || !calories) {
      setStatus("Enter both a workout name and calorie value.");
      return;
    }

    try {
      await addHealthEntry({ workout: workout.trim(), calories });
      setWorkout("");
      setCalories("");
      setStatus("Activity saved.");
      loadDashboard();
    } catch (error) {
      setStatus(error.response?.data?.message || "Unable to save activity.");
    }
  };

  return (
    <div className="page-shell">
      <Navbar />

      <main className="dashboard-grid">
        <section className="panel hero-panel">
          <div>
            <p className="eyebrow">Weekly streak</p>
            <h2>Keep the stars lit all week</h2>
            <p>Mark today complete after you finish your workout or walk.</p>
          </div>

          <button className="primary-button" onClick={handleComplete}>
            Mark Today Complete
          </button>
        </section>

        <section className="panel">
          <p className="eyebrow">Progress</p>
          <div className="week-bar">
            {days.map((day, index) => (
              <div key={day} className={`day-card ${streakDays.includes(index) ? "active" : ""}`}>
                <span className="star">{streakDays.includes(index) ? "*" : "o"}</span>
                <span>{day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <p className="eyebrow">Log activity</p>
          <form className="entry-form" onSubmit={handleAddEntry}>
            <input
              value={workout}
              onChange={(event) => setWorkout(event.target.value)}
              placeholder="Workout or activity"
            />
            <input
              type="number"
              min="0"
              value={calories}
              onChange={(event) => setCalories(event.target.value)}
              placeholder="Calories burned"
            />
            <button type="submit" className="primary-button">
              Add entry
            </button>
          </form>
          {status ? <p className="status-message">{status}</p> : null}
        </section>

        <section className="panel">
          <p className="eyebrow">Recent activity</p>
          {entries.length === 0 ? (
            <p>No activity yet. Add your first entry above.</p>
          ) : (
            <div className="entry-list">
              {entries.map((entry) => (
                <article key={entry._id} className="entry-card">
                  <h3>{entry.workout}</h3>
                  <p>{entry.calories} kcal</p>
                  <small>{new Date(entry.date).toLocaleString()}</small>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
