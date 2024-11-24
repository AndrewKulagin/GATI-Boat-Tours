import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Mail, Phone } from "lucide-react";
import { TOURS } from "../data/tours";
import emailjs from "@emailjs/browser";
import { trackEvent } from "../App";

const DEFAULT_MESSAGE = `Contact Number:
Number of People:
Enquiry:`;

// reCAPTCHA configuration
const RECAPTCHA_SITE_KEY = "6LfWbYYqAAAAAI4kLFzukXVq-TsIW7F4EJUA8Rps";

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contactDetails: "",
    enquiryType: "",
    tourType: "",
    preferredDate: null,
    message: DEFAULT_MESSAGE,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Handle URL parameters for pre-filling form
  useEffect(() => {
    const enquiryType = searchParams.get("type");
    const tourId = searchParams.get("tourId");

    if (enquiryType) {
      setFormData((prev) => ({
        ...prev,
        enquiryType,
        tourType: enquiryType === "Tour" && tourId ? tourId : prev.tourType,
        message: prev.message || DEFAULT_MESSAGE, // Ensure message contains default text
      }));

      // Track pre-filled form
      trackEvent(
        "Contact Form",
        "Pre-fill",
        `${enquiryType}${tourId ? ` - Tour ${tourId}` : ""}`
      );

      // Update URL to remove parameters while keeping the state
      navigate("/contact", { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    // Add style to show badge only on this page
    const style = document.createElement("style");
    style.innerHTML = `
      .grecaptcha-badge { 
        visibility: visible !important;
      }
    `;
    style.id = "recaptcha-style";
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.id = "recaptcha-script";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script
      const script = document.getElementById("recaptcha-script");
      if (script) {
        document.head.removeChild(script);
      }
      // Remove the style
      const style = document.getElementById("recaptcha-style");
      if (style) {
        document.head.removeChild(style);
      }
      // Remove the badge
      const badges = document.getElementsByClassName("grecaptcha-badge");
      if (badges.length > 0) {
        badges[0].remove();
      }
    };
  }, []);

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    // Only update if the message isn't being completely cleared

    setFormData((prev) => ({
      ...prev,
      message: newMessage,
    }));
  };

  const handleEnquiryTypeChange = (e) => {
    // Track enquiry type selection
    trackEvent("Contact Form", "Select Enquiry Type", e.target.value);

    setFormData((prev) => ({
      ...prev,
      enquiryType: e.target.value,
      tourType: e.target.value === "Tour" ? prev.tourType : "", // Keep tourType if enquiryType is Tour
    }));
  };

  const executeRecaptcha = async () => {
    if (!window.grecaptcha) {
      throw new Error("reCAPTCHA not loaded");
    }

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "submit_contact_form",
      });
      return token;
    } catch (error) {
      console.error("reCAPTCHA execution failed:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      // Get reCAPTCHA token
      const token = await executeRecaptcha();
      if (!token) {
        throw new Error("Failed to get reCAPTCHA token");
      }

      // Track form submission event
      trackEvent("Contact Form", "Submit", formData.enquiryType);

      let tourName = null;
      let hasTourType = false;
      if (formData.enquiryType === "Tour") {
        const selectedTour = TOURS.find(
          (tour) => String(tour.id) === String(formData.tourType)
        );

        const decodeHTML = (html) => {
          const txt = document.createElement("textarea");
          txt.innerHTML = html;
          return txt.value;
        };

        tourName = selectedTour
          ? decodeHTML(selectedTour.name)
          : "Unknown Tour";
        hasTourType = true;
      }

      const templateParams = {
        to_email: "cliff-wilson@hotmail.com",
        from_name: formData.name,
        subject: `${formData.name} - ${formData.enquiryType}`,
        message: formData.message,
        enquiry_type: formData.enquiryType,
        tour_type: tourName,
        hasTourType: hasTourType,
        contact_details: formData.contactDetails,
        preferred_date: formData.preferredDate
          ? formData.preferredDate.toLocaleDateString()
          : null,
        hasPreferredDate: !!formData.preferredDate,
        g_recaptcha_response: token,
      };

      await emailjs.send(
        "service_vxa324f",
        "template_thwx0cz",
        templateParams,
        "N3s57UlddpA1xIluP"
      );

      // Track successful form submission
      trackEvent("Contact Form", "Success", formData.enquiryType);

      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        contactDetails: "",
        enquiryType: "",
        tourType: "",
        preferredDate: null,
        message: DEFAULT_MESSAGE,
      });
    } catch (error) {
      console.error("Failed to send email:", error);

      // Track form submission failure
      trackEvent("Contact Form", "Error", formData.enquiryType);

      setStatus("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Keep existing contact info section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="mb-6 text-gray-700">
            You can reach us through the contact info below or through the
            enquiry form. Please make sure your contact info in the enquiry form
            is correct, as we will be unable to respond to you otherwise.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone
                className="h-6 w-6 text-blue-600 mr-3"
                onClick={() => trackEvent("Contact", "Click", "Phone Number")}
              />
              <a
                href="tel:0448434292"
                className="hover:underline"
                onClick={() => trackEvent("Contact", "Click", "Phone Number")}
              >
                0448 434 292
              </a>
            </div>
            <div className="flex items-center">
              <Mail
                className="h-6 w-6 text-blue-600 mr-3"
                onClick={() => trackEvent("Contact", "Click", "Email Address")}
              />
              <a
                href="mailto:cliff-wilson@hotmail.com?subject=Magnetic%20Island%20Boat%20Tour"
                className="hover:underline"
                onClick={() => trackEvent("Contact", "Click", "Email Address")}
              >
                cliff-wilson@hotmail.com
              </a>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Keep existing form fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Details
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.contactDetails}
                onChange={(e) =>
                  setFormData({ ...formData, contactDetails: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enquiry Type
              </label>
              <select
                required
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.enquiryType}
                onChange={handleEnquiryTypeChange}
              >
                <option value="">Select an enquiry type</option>
                <option value="General Enquiry">General Enquiry</option>
                <option value="Tour">Tour</option>
                <option value="Boat Hire">Boat Hire</option>
              </select>
            </div>
            {formData.enquiryType === "Tour" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tour Type
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.tourType}
                  onChange={(e) =>
                    setFormData({ ...formData, tourType: e.target.value })
                  }
                >
                  <option value="">Select a tour</option>
                  {TOURS.map((tour) => (
                    <option key={tour.id} value={tour.id}>
                      {tour.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date (Optional)
              </label>
              <DatePicker
                selected={formData.preferredDate}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, preferredDate: date }))
                }
                minDate={new Date()}
                maxDate={(() => {
                  const maxDate = new Date();
                  maxDate.setFullYear(maxDate.getFullYear() + 1);
                  return maxDate;
                })()}
                placeholderText="Select a date"
                className="w-full px-4 py-2 border rounded-lg"
                wrapperClassName="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                required
                rows={6}
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                value={formData.message}
                onChange={handleMessageChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status && (
              <div
                className={`text-sm ${
                  status.includes("Failed") ? "text-red-600" : "text-green-600"
                }`}
              >
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
