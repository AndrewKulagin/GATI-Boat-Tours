import React from 'react';
import ContactForm from '../components/ContactForm';
import { trackEvent } from "../App";

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