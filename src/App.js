import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TourPage from './pages/TourPage';
import FAQ from './pages/FAQ';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tours/:id" element={<TourPage />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;