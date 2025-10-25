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
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.map(e => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
      }));
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [startHour, setStartHour] = useState('');
  const [startPeriod, setStartPeriod] = useState('AM');
  const [endHour, setEndHour] = useState('');
  const [endPeriod, setEndPeriod] = useState('AM');

  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const handleEventResize = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    setEvents(prev => prev.map(e => (e.id === event.id ? updatedEvent : e)));
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    setEvents(prev => prev.map(e => (e.id === event.id ? updatedEvent : e)));
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setSelectedEvent(null);
    setTitle('');
    setStartHour('');
    setStartPeriod('AM');
    setEndHour('');
    setEndPeriod('AM');
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    const startMoment = moment(event.start);
    const endMoment = moment(event.end);

    setSelectedEvent(event);
    setSelectedDate(event.start);
    setTitle(event.title);
    setStartHour(startMoment.format('hh:mm'));
    setStartPeriod(startMoment.format('A'));
    setEndHour(endMoment.format('hh:mm'));
    setEndPeriod(endMoment.format('A'));
    setShowModal(true);
  };

  const togglePeriod = (setter, current) => {
    setter(current === 'AM' ? 'PM' : 'AM');
  };

  const handleAddEvent = () => {
    if (!title || !startHour || !endHour || !selectedDate) return;

    const start = moment(`${moment(selectedDate).format('YYYY-MM-DD')} ${startHour} ${startPeriod}`, 'YYYY-MM-DD hh:mm A').toDate();
    const end = moment(`${moment(selectedDate).format('YYYY-MM-DD')} ${endHour} ${endPeriod}`, 'YYYY-MM-DD hh:mm A').toDate();

    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        title,
        start,
        end,
      };
      setEvents(prev => prev.map(e => (e.id === selectedEvent.id ? updatedEvent : e)));
    } else {
      const newEvent = {
        id: Date.now(),
        title,
        start,
        end,
      };
      setEvents(prev => [...prev, newEvent]);
    }

    setShowModal(false);
    setTitle('');
    setStartHour('');
    setStartPeriod('AM');
    setEndHour('');
    setEndPeriod('AM');
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
      setShowModal(false);
      setTitle('');
      setStartHour('');
      setStartPeriod('AM');
      setEndHour('');
      setEndPeriod('AM');
      setSelectedEvent(null);
    }
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: '#3174ad',
      color: 'white',
      borderRadius: '4px',
      fontSize: '11px',
      padding: '2px 6px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
  });

  const customEventRenderer = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
        <li>{moment(event.start).format('h:mm A')} – {moment(event.end).format('h:mm A')}</li>
      </ul>
    </div>
  );

  return (
    <div className="calendar-wrapper">
      <h2>📅 Smart Table</h2>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedEvent ? 'Edit Event' : 'Add Event'}</h3>
            <input
              type="text"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ color: '#000' }}
            />
            <div className="time-input-group">
              <input
                type="text"
                placeholder="Start time (e.g. 09:30)"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                style={{ color: '#000' }}
              />
              <div className="ampm-toggle" onClick={() => togglePeriod(setStartPeriod, startPeriod)}>
                {startPeriod}
              </div>
            </div>
            <div className="time-input-group">
              <input
                type="text"
                placeholder="End time (e.g. 10:30)"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                style={{ color: '#000' }}
              />
              <div className="ampm-toggle" onClick={() => togglePeriod(setEndPeriod, endPeriod)}>
                {endPeriod}
              </div>
            </div>
            <div className="modal-buttons">
              <button onClick={handleAddEvent}>{selectedEvent ? 'Update' : 'Add'}</button>
              {selectedEvent && (
                <button className="delete-button" onClick={handleDeleteEvent}>Delete</button>
              )}
              <button onClick={() => {
                setShowModal(false);
                setSelectedEvent(null);
                setTitle('');
                setStartHour('');
                setStartPeriod('AM');
                setEndHour('');
                setEndPeriod('AM');
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <DnDCalendar
        localizer={localizer}
        events={events}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: '120vh' }}
        eventPropGetter={eventStyleGetter}
        components={{ event: customEventRenderer }}
        selectable
        resizable
      />
    </div>
  );
}

export default CalendarApp;
