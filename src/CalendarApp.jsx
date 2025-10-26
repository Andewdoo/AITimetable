import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { v4 as uuidv4 } from 'uuid';
import { Settings } from 'lucide-react';
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
      return parsed.map(e => ({ ...e, start: new Date(e.start), end: new Date(e.end) }));
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [startHour, setStartHour] = useState('09:00');
  const [endHour, setEndHour] = useState('10:00');
  const [color, setColor] = useState('#FFB3BA');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('month');
  const [showSettings, setShowSettings] = useState(false);

  const calendarRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const presetColors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D5BAFF', '#FFBAED'];

  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  // Disable scroll on time inputs
  useEffect(() => {
    const disableScroll = e => e.preventDefault();
    [startRef, endRef].forEach(ref => {
      if (ref.current) ref.current.addEventListener('wheel', disableScroll, { passive: false });
    });
    return () => {
      [startRef, endRef].forEach(ref => {
        if (ref.current) ref.current.removeEventListener('wheel', disableScroll);
      });
    };
  }, []);

  // Arrow key navigation
  useEffect(() => {
    const handleArrowKeys = e => {
      if (!calendarRef.current) return;
      if (e.key === 'ArrowLeft') calendarRef.current.onNavigate('PREV');
      if (e.key === 'ArrowRight') calendarRef.current.onNavigate('NEXT');
    };
    window.addEventListener('keydown', handleArrowKeys);
    return () => window.removeEventListener('keydown', handleArrowKeys);
  }, []);

  const handleEventResize = ({ event, start, end }) =>
    setEvents(prev => prev.map(e => (e.id === event.id ? { ...e, start, end } : e)));

  const handleEventDrop = ({ event, start, end }) =>
    setEvents(prev => prev.map(e => (e.id === event.id ? { ...e, start, end } : e)));

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setSelectedEvent(null);
    setTitle('');
    setStartHour('09:00');
    setEndHour('10:00');
    setColor('#FFB3BA');
    setShowModal(true);
  };

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setSelectedDate(event.start);
    setTitle(event.title);
    setStartHour(moment(event.start).format('HH:mm'));
    setEndHour(moment(event.end).format('HH:mm'));
    setColor(event.color || '#FFB3BA');
    setShowModal(true);
  };

  const adjustTimeString = (timeStr, deltaMinutes) =>
    moment(timeStr || '00:00', 'HH:mm').add(deltaMinutes, 'minutes').format('HH:mm');

  const handleTimeWheel = (e, setFn, step = 5) => {
    e.preventDefault();
    setFn(prev => adjustTimeString(prev, e.deltaY < 0 ? step : -step));
  };

  const handleTimeKey = (e, setFn, step = 5) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFn(prev => adjustTimeString(prev, step));
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFn(prev => adjustTimeString(prev, -step));
    }
  };

  const handleAddEvent = () => {
    if (!title || !startHour || !endHour || !selectedDate) return;
    const start = moment(`${moment(selectedDate).format('YYYY-MM-DD')} ${startHour}`).toDate();
    const end = moment(`${moment(selectedDate).format('YYYY-MM-DD')} ${endHour}`).toDate();
    const newEvent = { id: selectedEvent?.id || uuidv4(), title, start, end, color };
    if (selectedEvent) setEvents(prev => prev.map(e => (e.id === selectedEvent.id ? newEvent : e)));
    else setEvents(prev => [...prev, newEvent]);
    setShowModal(false);
    setTitle('');
    setStartHour('09:00');
    setEndHour('10:00');
    setColor('#FFB3BA');
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
    setShowModal(false);
    setSelectedEvent(null);
  };

  const eventStyleGetter = event => ({
    style: {
      backgroundColor: event.color,
      color: '#fff',
      borderRadius: '6px',
      padding: '2px 4px',
      fontSize: '11px',
      display: 'flex',
      flexDirection: 'column',
    },
  });

  const EventComponent = ({ event }) => (
    <div>
      <div>{event.title}</div>
      <div style={{ fontSize: '9px', marginTop: '2px' }}>
        {moment(event.start).format('HH:mm')} – {moment(event.end).format('HH:mm')}
      </div>
    </div>
  );

  const filteredEvents = events.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={`calendar-wrapper ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="calendar-header">
        <h2 className="calendar-month">{moment().format('MMMM YYYY')}</h2>

        <div className="header-controls">
          <div className="left-controls">
            <select
              className="view-selector"
              value={currentView}
              onChange={e => setCurrentView(e.target.value)}
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>

            <div
              className="toggle-container"
              onClick={() => setDarkMode(prev => !prev)}
            >
              <span>{darkMode ? '🌙 Night' : '☀️ Day'}</span>
              <div className={`toggle-switch ${darkMode ? 'active' : ''}`}></div>
            </div>
          </div>

          <button
            className="settings-btn"
            title="Settings"
            onClick={() => setShowSettings(prev => !prev)}
          >
            <Settings size={22} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="event-form">
        <input
          type="text"
          placeholder="🔍 Search events..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="clear-btn" onClick={() => setSearchTerm('')}>
          Clear
        </button>
      </div>

      {/* Calendar */}
      <div
        className="calendar-content-wrapper"
        onMouseEnter={() => (document.body.style.overflow = 'hidden')}
        onMouseLeave={() => (document.body.style.overflow = 'auto')}
      >
        <DnDCalendar
          ref={calendarRef}
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          selectable
          resizable
          view={currentView}
          onView={setCurrentView}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          components={{ event: EventComponent }}
          toolbar={false}
          style={{ height: '80vh' }}
        />
      </div>

      {/* Floating Add Button */}
      <button className="fab" onClick={() => handleSelectSlot({ start: new Date() })}>
        ＋
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel">
          <h4>Settings</h4>
          <p>More customization features coming soon...</p>
          <button onClick={() => setShowSettings(false)}>Close</button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedEvent ? 'Edit Event' : 'Add Event'}</h3>
            <input
              type="text"
              placeholder="Event title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="time-range">
              <input
                ref={startRef}
                type="time"
                value={startHour}
                onChange={e => setStartHour(e.target.value)}
                onWheel={e => handleTimeWheel(e, setStartHour)}
                onKeyDown={e => handleTimeKey(e, setStartHour)}
              />
              <span className="time-dash">–</span>
              <input
                ref={endRef}
                type="time"
                value={endHour}
                onChange={e => setEndHour(e.target.value)}
                onWheel={e => handleTimeWheel(e, setEndHour)}
                onKeyDown={e => handleTimeKey(e, setEndHour)}
              />
            </div>

            <div className="color-section">
              <label>Event Color:</label>
              <div className="color-bar" style={{ "--selected-color": color }}>
                <input
                  type="color"
                  className="color-picker"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                />
              </div>
              <div className="preset-colors">
                {presetColors.map(c => (
                  <div
                    key={c}
                    className={`preset ${color === c ? 'active' : ''}`}
                    style={{ "--preset-color": c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>

            <div className="modal-buttons">
              <button onClick={handleAddEvent}>{selectedEvent ? 'Update' : 'Add'}</button>
              {selectedEvent && (
                <button className="delete-button" onClick={handleDeleteEvent}>
                  Delete
                </button>
              )}
              <button className="cancel-button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarApp;
