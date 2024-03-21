import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import About from './pages/About';
import NotFound from './pages/NotFound'; // Import the NotFound component

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          {/* Route for the 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
