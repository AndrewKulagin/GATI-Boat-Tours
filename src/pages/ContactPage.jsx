import React from 'react';
import ContactForm from '../components/ContactForm';

// Tracking function
const trackEvent = (category, action, label) => {
  if (window.gtag) {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
};

const ContactPage = () => {
  // Track page view when the contact page is loaded
  React.useEffect(() => {
    trackEvent('View', 'Contact Page', 'Loaded');
  }, []);

  return (
    <div>
      <ContactForm />
    </div>
  );
};

export default ContactPage;