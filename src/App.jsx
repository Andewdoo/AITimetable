// import { useState } from 'react'
// import './App.css'
// import TopBar from './top-bar.jsx' 
// import Carousel from './body.jsx'
// import Landing from './Landing.jsx'
// import CalendarApp from './CalendarApp.jsx'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <TopBar />
//     <Landing />
//     <Carousel />
//     {/* <CalendarApp /> */}
//     </>
//   )
// }

// export default App
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import TopBar from './top-bar.jsx';
import Carousel from './body.jsx';
import Landing from './Landing.jsx';
import CalendarApp from './CalendarApp.jsx';
import LoginPage from './login.jsx';

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
      </Routes>
    </Router>
  );
}

export default App;
