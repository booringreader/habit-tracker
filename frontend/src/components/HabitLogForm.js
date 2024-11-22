import React, { useState } from 'react';

const HabitLogForm = ({ fetchHabitLogs, habits }) => {
  const [habitId, setHabitId] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLog = { habit_id: habitId, date };

    const response = await fetch('http://localhost:8000/habitlogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLog),
    });

    if (response.ok) {
      fetchHabitLogs();  // Fetch updated habit logs after submission
      setHabitId('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold">Select Habit</label>
        <select
          className="w-full p-2 border rounded-md"
          value={habitId}
          onChange={(e) => setHabitId(e.target.value)}
          required
        >
          <option value="">-- Select Habit --</option>
          {habits.map(habit => (
            <option key={habit.id} value={habit.id}>{habit.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold">Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Log Habit</button>
    </form>
  );
};

export default HabitLogForm;
