import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import TopBar from './top-bar.jsx';
import Carousel from './body.jsx';
import Landing from './Landing.jsx';
import CalendarPage from './Calendarpage.jsx';
import LoginPage from './login.jsx';
import SignupPage from './SignupPage.jsx';
import HOME from './home.jsx';
import WhySmartTable from './why.jsx';
import ContactPage from './contact.jsx';

function AppWrapper() {
  const location = useLocation();
  const showTopBar = !location.pathname.toLowerCase().startsWith('/calendarpage');

  return (
    <>
      {showTopBar && <TopBar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
              <Carousel />
            </>
          }
        />
        <Route path="/calendarpage" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HOME />} />
        <Route path="/why" element={<WhySmartTable />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
