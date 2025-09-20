import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import TopBar from './top-bar.jsx';
import Carousel from './body.jsx';
import Landing from './Landing.jsx';
import CalendarApp from './CalendarApp.jsx';
import LoginPage from './login.jsx';
import SignupPage from './SignupPage.jsx';
import HOME from './home.jsx';

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={
          <>
            <Landing />
            <Carousel />
          </>
        } />
        <Route path="/calendar" element={<CalendarApp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HOME/>} />
      </Routes>
    </Router>
  );
}

export default App;
