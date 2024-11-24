import React from "react";
import ContactForm from "../components/ContactForm";
import { trackEvent } from "../App";
import { Helmet } from "react-helmet";

const ContactPage = () => {
  // Track page view when the contact page is loaded
  React.useEffect(() => {
    trackEvent("View", "Contact Page", "Loaded");
  }, []);

  return (
    <div>
      <Helmet>
        <title>
          Magnetic Island FAQs | Tours, Accessibility & Pricing Information
        </title>
        <meta
          name="description"
          content="Get in touch with us through our comprehensive Contact Page. Submit your enquiries with ease using our intuitive contact form, featuring pre-filled fields, reCAPTCHA security, and seamless tour selection for a hassle-free experience. Reach us via email or phone for quick assistance."
        />
      </Helmet>

      <ContactForm />
    </div>
  );
};

export default ContactPage;
