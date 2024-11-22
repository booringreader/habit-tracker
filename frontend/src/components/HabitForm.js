import React, { useState } from 'react';

const HabitForm = ({ fetchHabits }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHabit = { name, description, frequency };

    const response = await fetch('http://localhost:8000/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHabit),
    });

    if (response.ok) {
      fetchHabits();  // Fetch updated habits after submission
      setName('');
      setDescription('');
      setFrequency('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold">Habit Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold">Description</label>
        <textarea
          className="w-full p-2 border rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold">Frequency (times/week)</label>
        <input
          type="number"
          className="w-full p-2 border rounded-md"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Add Habit</button>
    </form>
  );
};

export default HabitForm;
