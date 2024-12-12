import { useEffect, useState } from "react";

const useEventStore = () => {
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('events')) || {});

  const isEventOverlapping = (dateString, newEvent, existingEvents) => {
    const newStart = new Date(`${dateString}T${newEvent.startTime}`);
    const newEnd = new Date(`${dateString}T${newEvent.endTime}`);

    return existingEvents.some(existingEvent => {
      const existingStart = new Date(`${dateString}T${existingEvent.startTime}`);
      const existingEnd = new Date(`${dateString}T${existingEvent.endTime}`);

      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  };

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (dateString, eventData) => {
    const existingEvents = events[dateString] || [];
    
    if (isEventOverlapping(dateString, eventData, existingEvents)) {
      throw new Error('Event overlaps with existing event');
    }

    const newEvent = {
      ...eventData,
      id: Date.now().toString() // Add unique ID
    };

    setEvents(prev => ({
      ...prev,
      [dateString]: [...(prev[dateString] || []), newEvent]
    }));

    return newEvent;
  };

  const deleteEvent = (date, eventId) => {
    // const dateKey = date.toISOString().split('T')[0];
    if (events[date]) {
      const filteredEvents = events[date].filter(event => event.id !== eventId);
      setEvents({
        ...events,
        [date]: filteredEvents
      });
    }
  };

  const getEvents = (date) => {
    console.log(date)
    // const dateKey = date.toISOString().split('T')[0];
    return events[date] || [];
  };

  return { addEvent, getEvents, deleteEvent };
};
export default useEventStore;