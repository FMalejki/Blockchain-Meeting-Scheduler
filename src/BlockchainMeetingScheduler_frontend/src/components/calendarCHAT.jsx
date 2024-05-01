import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function InteractiveCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateClick = (date) => {
    const dateStr = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    // Check if the date is already selected
    if (selectedDates.includes(dateStr)) {
      setSelectedDates(selectedDates.filter((d) => d !== dateStr)); // Deselect the date
    } else {
      setSelectedDates([...selectedDates, dateStr]); // Select the date
    }
  };

  return (
    <div>
      <h1>Interactive Calendar</h1>
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDates.map((dateStr) => new Date(dateStr))}
      />
      <div>
        <h2>Selected Dates:</h2>
        <ul>
          {selectedDates.map((dateStr, index) => (
            <li key={index}>{dateStr}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InteractiveCalendar;