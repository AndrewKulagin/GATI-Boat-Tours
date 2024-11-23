import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TourPage from './pages/TourPage';
import FAQ from './pages/FAQ';
import BoatHirePage from './pages/BoatHirePage';

// Analytics wrapper component
const AnalyticsWrapper = ({ children }) => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }, [location]);

  return children;
};

// Event tracking function that can be exported
export const trackEvent = (category, action, label) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};

const App = () => {
  return (
    <Router>
      <AnalyticsWrapper>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/tours/:id" element={<TourPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/boat-hire" element={<BoatHirePage />} />
          </Routes>
        </div>
      </AnalyticsWrapper>
    </Router>
  );
};

export default App;