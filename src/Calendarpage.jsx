import React from 'react';
import Sidebar from './calendar_left.jsx';
import CalendarApp from './CalendarApp.jsx';

function CalendarPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <CalendarApp />
      </div>
    </div>
  );
}

export default CalendarPage;
