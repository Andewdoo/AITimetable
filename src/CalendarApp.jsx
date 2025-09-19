import { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarApp.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function CalendarApp() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendar-events');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    setEvents(prev =>
      prev.map(e => (e.id === event.id ? updatedEvent : e))
    );
  };

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter note title:');
    if (title) {
      const newEvent = {
        id: Date.now(),
        title,
        start,
        end,
      };
      setEvents(prev => [...prev, newEvent]);
    }
  };

  return (
    <div className="calendar-wrapper">
      <h2>📆 Smart Table Scheduler</h2>
      <DnDCalendar
        localizer={localizer}
        events={events}
        onEventDrop={handleEventDrop}
        onSelectSlot={handleSelectSlot}
        selectable
        resizable
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh' }}
      />
    </div>
  );
}

export default CalendarApp;
