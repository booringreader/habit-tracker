import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Habits = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/habits')
      .then(response => setHabits(response.data))
      .catch(error => console.error('Error fetching habits:', error));
  }, []);

  return (
    <div>
      <h1>Habits</h1>
      <ul>
        {habits.map(habit => (
          <li key={habit.id}>
            {habit.name} - {habit.description} (Frequency: {habit.frequency})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Habits;
