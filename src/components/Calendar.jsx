import { useState, useEffect } from 'react';
import { getMonthData } from '../utils/calendarLogic'; // Assume this is a utility to compute days in a month

const Calendar = ({ onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    setMonthData(getMonthData(currentDate.getFullYear(), currentDate.getMonth()));
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className='flex justify-center gap-x-10'>
      <button onClick={handlePrevMonth}>Previous</button>
        <div className='flex flex-col items-center'>
          <div>
            {currentDate.toLocaleString('default', { month: 'long' })}
            {" " + currentDate.getFullYear()}
          </div>
          <div className='flex gap-x-7 mr-2'>
            {["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"].map((day, index) => (
              <div key={index} className=''>
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {monthData.map((day, index) => (
              <div key={index} className={`p-2 m-1 w-11 text-center border border-black ${day.isWeekend ? 'bg-gray-200' : ''}`} onClick={() => onDayClick(day)}>
                {day.date}
              </div>
            ))}
          </div>
        </div>
      <button onClick={handleNextMonth}>Next</button>
    </div>
  );
};

export default Calendar;
