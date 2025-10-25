import React, { useState, useEffect } from 'react';
import './calendar-left.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const [calendars, setCalendars] = useState([
    { name: 'Work Plan', color: 'red' },
    { name: 'Project', color: 'yellow' },
    { name: 'Holiday', color: 'green' },
    { name: 'Fitness', color: 'blue' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [hovered, setHovered] = useState(null);
  const [activeColor, setActiveColor] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Events state keyed by ISO date string 'YYYY-MM-DD'
  const [eventsByDate, setEventsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventCalendar, setEventCalendar] = useState(calendars[0]?.color || '');

  const colorOptions = ['red', 'yellow', 'green', 'blue', 'purple', 'orange', 'teal'];
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  useEffect(() => {
    if (!eventCalendar && calendars.length) setEventCalendar(calendars[0].color);
  }, [calendars, eventCalendar]);

  const handleAddCalendar = () => {
    if (!newName || !selectedColor) return;
    setCalendars(prev => [...prev, { name: newName, color: selectedColor }]);
    setNewName('');
    setSelectedColor('');
    setShowModal(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const isoFor = (year, month, day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const getCalendarDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = (firstDay + 6) % 7;
    const datesArray = Array(offset).fill(null).concat(
      Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );
    return { year, month, datesArray, daysInMonth };
  };

  const isWeekend = (year, month, day) => {
    if (!day) return false;
    const weekday = new Date(year, month, day).getDay();
    return weekday === 0 || weekday === 6;
  };

  const holidays = { '01-01': "New Year's Day", '12-25': 'Christmas Day' };

  const holidayFor = (month, day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return holidays[`${mm}-${dd}`];
  };

  const handleDateClick = (year, month, day) => {
    if (!day) return;
    const iso = isoFor(year, month, day);
    setSelectedDate(iso);
    setEventTitle('');
    setEventCalendar(activeColor || calendars[0]?.color || '');
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    if (!selectedDate || !eventTitle) return;
    setEventsByDate(prev => {
      const existing = prev[selectedDate] || [];
      const newEvent = { id: Date.now(), title: eventTitle, calendarColor: eventCalendar };
      const updated = { ...prev, [selectedDate]: [...existing, newEvent] };
      return updated;
    });
    setShowEventModal(false);
    setEventTitle('');
  };

  const removeEvent = (dateKey, eventId) => {
    setEventsByDate(prev => {
      const updated = (prev[dateKey] || []).filter(e => e.id !== eventId);
      return { ...prev, [dateKey]: updated };
    });
  };

  const { year, month, datesArray } = getCalendarDates();
  const today = new Date();
  const isThisMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="sidebar-toggle"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? '◀' : '▶'}
      </button>

      <div className="sidebar-content">
        <div className="sidebar-header">
        </div>

        <div className="month-nav">
          <button onClick={handlePrevMonth} aria-label="Previous month">{'<'}</button>
          <span>
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </span>
          <button onClick={handleNextMonth} aria-label="Next month">{'>'}</button>
        </div>

        <div className="calendar-grid calendar-transition">
          {days.map(day => (
            <div key={day} className="calendar-day">{day}</div>
          ))}

          {datesArray.map((date, idx) => {
            const iso = date ? isoFor(year, month, date) : null;
            const isToday = date && isThisMonth && date === today.getDate();
            const weekend = isWeekend(year, month, date);
            const holidayName = date ? holidayFor(month, date) : null;
            const events = iso ? eventsByDate[iso] || [] : [];

            return (
              <div
                key={idx}
                className={[
                  'calendar-date',
                  weekend ? 'weekend' : '',
                  holidayName ? 'holiday' : '',
                  isToday ? 'selected-date' : '',
                ].join(' ')}
                onClick={() => handleDateClick(year, month, date)}
              >
                <div className="date-row">
                  <span className="date-number" style={{ color: holidayName ? '#000' : undefined }}>
                    {date || ''}
                  </span>
                  {holidayName && <span className="holiday-dot" title={holidayName} />}
                </div>

                {events.length > 0 && (
                  <div className="events-preview">
                    {events.slice(0, 2).map(ev => (
                      <div key={ev.id} className={`event-pill ${ev.calendarColor}`}>
                        <span className="event-title">{ev.title}</span>
                      </div>
                    ))}
                    {events.length > 2 && <div className="more-events">+{events.length - 2}</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="search-bar">
          <span>🔍</span>
          <input type="text" placeholder="Find calendar or room..." />
        </div>

        <div className="my-calendar">
          <h4>My Calendar</h4>
          <div className="calendar-account-list">
            {calendars.map((cal, idx) => (
              <div
                key={idx}
                className={`calendar-account ${cal.color} ${activeColor === cal.color ? 'active' : ''}`}
                onClick={() => setActiveColor(cal.color)}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="account-name">{cal.name}</span>
                {hovered === idx && (
                  <span
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCalendars(prev => prev.filter((_, i) => i !== idx));
                      if (activeColor === cal.color) setActiveColor('');
                    }}
                  >
                    ❌
                  </span>
                )}
              </div>
            ))}
          </div>
          <button className="add-calendar" onClick={() => setShowModal(true)}>
            + Add calendar account
          </button>
        </div>

        {/* Add Calendar Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Add Calendar Account</h3>
              <input
                type="text"
                placeholder="Calendar name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <div className="color-picker">
                {colorOptions.map(color => (
                  <div
                    key={color}
                    className={`color-swatch ${color} ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
              <div className="modal-buttons">
                <button onClick={handleAddCalendar}>Add</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Event Modal */}
        {showEventModal && (
          <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Add Event</h3>
              <div className="modal-sub">Date: <strong>{selectedDate}</strong></div>
              <input
                type="text"
                placeholder="Event title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <label className="modal-label">Calendar</label>
              <select value={eventCalendar} onChange={(e) => setEventCalendar(e.target.value)}>
                {calendars.map((c, i) => (
                  <option key={i} value={c.color}>{c.name}</option>
                ))}
              </select>
              <div className="modal-buttons">
                <button onClick={handleAddEvent}>Save Event</button>
                <button onClick={() => setShowEventModal(false)}>Cancel</button>
              </div>

              <div className="events-list">
                <h4>Events</h4>
                {(eventsByDate[selectedDate] || []).map(ev => (
                  <div key={ev.id} className="event-row">
                    <div className={`event-pill small ${ev.calendarColor}`}>
                      <span className="event-title">{ev.title}</span>
                    </div>
                    <button className="remove-event" onClick={() => removeEvent(selectedDate, ev.id)}>Remove</button>
                  </div>
                ))}
                {!(eventsByDate[selectedDate] || []).length && <div className="no-events">No events</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
