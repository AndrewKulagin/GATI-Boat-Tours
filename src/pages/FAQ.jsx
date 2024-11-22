import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Tracking function
const trackEvent = (category, action, label) => {
  if (window.gtag) {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
};

const FAQPage = () => {
  const faqs = [
    {
      question: "What tours do you offer?",
      answer: "We offer several tour options including snorkeling trips, fishing excursions, sunset boat tours, and private charters. Each tour can be customized to your preferences and operates on 'Maggie Time' - meaning you won't be rushed from place to place."
    },
    {
      question: "What's included in our tours?",
      answer: "All tours include essential equipment such as fishing gear, life jackets, stinger suits (seasonal), first aid kit, snorkel equipment, esky, dry storage, refreshments, and drinking water. Our experienced guides provide safety briefings and instruction where needed."
    },
    {
      question: "How much do tours cost?",
      answer: "Tours start from as little as $100 per person, with the final price depending on the number of bookings that day. We offer fantastic deals for group bookings of 6-8 people. Contact us for specific pricing based on your preferred tour and group size."
    },
    {
      question: "Are your boats wheelchair accessible?",
      answer: "Yes! All our boats are wheelchair accessible. We pride ourselves on making our tours available to everyone."
    },
    {
      question: "When is the best time to go fishing?",
      answer: "For fishing excursions, we typically recommend an early start around 7 AM to make the most of the day. However, we also offer late afternoon and evening fishing trips. The best time can vary based on the season and weather conditions."
    },
    {
      question: "What fish species can we catch?",
      answer: "Common catches include mackerel, coral trout, mangrove jack, and various other species. We'll provide you with fishing charts showing what can and can't be kept according to local regulations."
    },
    {
      question: "What areas do your tours cover?",
      answer: "We operate around all of Magnetic Island's bays including Nelly Bay, Geoffrey Bay, Florence Bay, Arthur Bay, Radical Bay, and Horseshoe Bay. For sunset tours, we often visit West Point for uninterrupted views. The specific locations visited depend on weather conditions and tour type."
    },
    {
      question: "Do you provide food and drinks?",
      answer: "We provide refreshments and drinking water. For sunset tours and longer excursions, you're welcome to bring your own food and drinks. We have esky storage available to keep your items cool."
    },
    {
      question: "What should I bring?",
      answer: "We recommend bringing sun protection (hat, sunscreen, sunglasses), comfortable clothing, and a camera. For sunset tours, you might want to bring snacks and drinks. We provide all necessary equipment for activities."
    },
    {
      question: "What if the weather is bad?",
      answer: "Your safety is our priority. If weather conditions are unsuitable, we'll work with you to reschedule your tour or provide a refund. We'll monitor conditions and keep you informed of any potential changes."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[40vh] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <img
            src="/images/faq-hero.jpg"
            alt="Magnetic Island Waters"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-3xl mx-auto">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything you need to know about our boat tours
            </motion.p>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              onClick={() => trackEvent('FAQ', 'View', `FAQ ${index + 1}`)}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
        <Link
            to={`/contact?type=General Enquiry`}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 inline-block text-lg"
            onClick={() => trackEvent('Button', "Navigation", "To Contact Us", 'Click', 'Contact Us FAQ')}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;