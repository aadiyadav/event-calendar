import { useState } from 'react';

const EventModal = ({
  day, 
  events, 
  onAddEvent, 
  onDeleteEvent, 
  onClose,
  searchKeyword,
  onSearchChange,
}) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const validateTimes = () => {
    if (startTime >= endTime) {
      setError('End time must be after start time');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateTimes()) {
      return;
    }

    try {
      onAddEvent({
        name: eventName,
        startTime,
        endTime,
        description
      });
      
      // Clear form on success
      setEventName('');
      setStartTime('');
      setEndTime('');
      setDescription('');
    } catch (err) {
      setError('This time slot conflicts with an existing event');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Event Details for {day.dateString}</h3>
          
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search events..."
              value={searchKeyword}
              onChange={(e) => onSearchChange(e.target.value)}
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>

          {error && (
            <div className="mt-2 p-2 text-sm text-red-600 bg-red-100 rounded">
              {error}
            </div>
          )}
          
          <div className="mt-2">
            <p className="text-sm text-gray-500">Add or edit your events below.</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              required
            />
            <input
              type="time"
              placeholder="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              required
            />
            <input
              type="time"
              placeholder="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Save Event
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
          <div className="mt-4">
            <h4 className="text-md leading-6 font-medium text-gray-900">
              {searchKeyword ? 'Filtered Events:' : 'Current Events:'}
              {events.length === 0 && searchKeyword && 
                <p className="text-sm text-gray-500">No events found matching "{searchKeyword}"</p>
              }
            </h4>
            <ul>
              {events
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((event, index) => (
                  <li key={index} className="text-sm text-gray-500 py-1">
                    {event.name} ({event.startTime} - {event.endTime})
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Delete
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
