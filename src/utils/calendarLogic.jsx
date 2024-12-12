// src/calendarLogic.js

export const getMonthData = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthData = [];

    // Start from the first day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        monthData.push({
            date: date.getDate(),
            isWeekend: date.getDay() === 0 || date.getDay() === 6, // Sunday = 0, Saturday = 6
            isToday: isToday(date),
            dateString: date.toISOString().split('T')[0] // Format as "YYYY-MM-DD"
        });
    }

    return monthData;
};

const isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
           someDate.getMonth() === today.getMonth() &&
           someDate.getFullYear() === today.getFullYear();
};
