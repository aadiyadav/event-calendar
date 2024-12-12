import { useState } from 'react';
import Calendar from './components/Calendar';
import useEventStore from './utils/useEventStore.jsx';
import EventModal from './utils/eventModal.jsx'; // Assuming a component for handling event details

const App = () => {
  const { addEvent, getEvents, deleteEvent } = useEventStore();
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalOpen(true);
  };

  const handleAddEvent = (eventData) => {
    addEvent(selectedDay.dateString, eventData);
    setModalOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(selectedDay.dateString, eventId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getFilteredEvents = (dateString) => {
    const events = getEvents(dateString);
    if (!searchKeyword) return events;
    
    return events.filter(event => 
      event.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  return (
    <div className="">
      <Calendar onDayClick={handleDayClick} />
      {modalOpen && (
        <EventModal
          day={selectedDay}
          events={getFilteredEvents(selectedDay.dateString)}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          onClose={handleCloseModal}
          searchKeyword={searchKeyword}
          onSearchChange={setSearchKeyword}
        />
      )}
    </div>
  );
};

export default App;
