import React, { useState, useEffect } from 'react';
import HabitForm from './components/HabitForm';
import HabitLogForm from './components/HabitLogForm';

function App() {
  const [habits, setHabits] = useState([]);
  const [habitLogs, setHabitLogs] = useState([]);

  // Fetch habits
  const fetchHabits = async () => {
    const response = await fetch('http://localhost:8000/habits');
    const data = await response.json();
    setHabits(data);
  };

  // Fetch habit logs
  const fetchHabitLogs = async () => {
    const response = await fetch('http://localhost:8000/habitlogs');
    const data = await response.json();
    setHabitLogs(data);
  };

  useEffect(() => {
    fetchHabits();
    fetchHabitLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Habit Tracker</h1>

        {/* Habit Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add a Habit</h2>
          <HabitForm fetchHabits={fetchHabits} />
        </div>

        {/* Habit List */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Habits</h2>
          <ul>
            {habits.map(habit => (
              <li key={habit.id} className="flex justify-between items-center mb-4">
                <span>{habit.name}</span>
                <span className="text-sm text-gray-500">{habit.frequency} times/week</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Habit Log Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Log a Habit</h2>
          <HabitLogForm fetchHabitLogs={fetchHabitLogs} habits={habits} />
        </div>

        {/* Habit Log List */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Habit Logs</h2>
          <ul>
            {habitLogs.length > 0 ? (
              habitLogs.map(log => (
                <li key={log.id} className="flex justify-between items-center mb-4">
                  <span>{`Habit ID: ${log.habit_id}`}</span>
                  <span className="text-sm text-gray-500">{log.date}</span>
                </li>
              ))
            ) : (
              <li>No logs yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
