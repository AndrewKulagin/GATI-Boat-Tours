import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TourPage from './pages/TourPage';
import FAQ from './pages/FAQ';
import BoatHirePage from './pages/BoatHirePage';

// Analytics Service
const GA_MEASUREMENT_ID = G-G1Q96T1QXM;

const loadGoogleAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      'anonymize_ip': true,
    });
  }
};

const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      'page_path': path
    });
  }
};

// Analytics Tracking Wrapper Component
const AnalyticsTracking = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Load Google Analytics on initial load
    loadGoogleAnalytics();
  }, []);

  useEffect(() => {
    // Track page views on route change
    trackPageView(location.pathname);
    
    // Optional: Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

const App = () => {
  return (
    <Router>
      <AnalyticsTracking>
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
      </AnalyticsTracking>
    </Router>
  );
};

export default App;