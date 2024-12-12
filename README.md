# React Events Calendar Application

A dynamic event calendar built with React.js and TailwindCSS that allows users to manage and track events efficiently.

## Features

- Interactive monthly calendar view
- Navigate between months using Previous/Next buttons
- Weekend day highlighting for better visual distinction
- Add events to specific dates
- View events for each day
- Delete existing events
- Local storage persistence of events
- Prevents event time conflicts
- Responsive grid layout

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repository-url]
```

2. Navigate to the project directory
```bash
cd react-calendar-events
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

- `src/`
  - `App.jsx` - Main application component
  - `Calendar.jsx` - Calendar grid component
  - `EventModal.jsx` - Modal for event management
  - `utils/calendarLogic.js` - Calendar utility functions
  - `utils/useEventStore.js` - Event management hook

## Built With

- React.js
- TailwindCSS
- Local Storage for data persistence

## Live Demo

https://event-calendar-self.vercel.app/
