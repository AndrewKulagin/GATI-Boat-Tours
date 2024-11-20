import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { TOURS } from "../data/tours";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactDetails: "",
    tourType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const selectedTour = TOURS.find(
      (tour) => String(tour.id) === String(formData.tourType)
    );

    const decodeHTML = (html) => {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    };

    const tourName = selectedTour
      ? decodeHTML(selectedTour.name)
      : "Unknown Tour";

    try {
      const templateParams = {
        to_email: "andrewkulagin565@gmail.com",
        from_name: formData.name,
        subject: `${formData.name} - ${tourName}`,
        message: formData.message,
        tour_type: tourName,
        contact_details: formData.contactDetails,
      };

      await emailjs.send(
        "service_vxa324f",
        "template_thwx0cz",
        templateParams,
        "N3s57UlddpA1xIluP"
      );

      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        contactDetails: "",
        tourType: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="mb-6 text-gray-700">
            You can reach us through the contact info below or through the enquiry form. 
            Please make sure your contact info in the enquiry form is correct, 
            as we will be unable to respond to you otherwise.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-blue-600 mr-3" />
              <a href="tel:0448434292" className="hover:underline">
                0448 434 292
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-600 mr-3" />
              <a
                href="mailto:andrewkulagin565@gmail.com?subject=Magnetic%20Island%20Boat%20Tour"
                className="hover:underline"
              >
                andrewkulagin565@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
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
