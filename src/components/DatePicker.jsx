import React, { useState } from 'react';

const DatePicker = () => {
const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
      <input
        type="date"
        id="date"
        className="px-4 py-2 bg-secondary-900 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        value={selectedDate}
        onChange={handleDateChange}
      />
  );
};

export default DatePicker;