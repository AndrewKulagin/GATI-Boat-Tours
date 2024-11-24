import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Shield } from "lucide-react";
import { trackEvent } from "../App";
import { getImageUrl } from "../services/azureStorage";

const AboutPage = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6 mb-2 text-white-600" />,
      title: "Flexible Hours",
      description:
        "Operating on 'Maggie Time' - your day, your adventure, your choice!",
    },
    {
      icon: <Users className="w-6 h-6 mb-2 text-white-600" />,
      title: "All Welcome",
      description:
        "Wheelchair accessible boats and family-friendly tours for all skill levels",
    },
    {
      icon: <Shield className="w-6 h-6 mb-2 text-white-600" />,
      title: "Safety First",
      description:
        "Fully equipped with all necessary safety gear and first aid facilities",
    },
    {
      icon: <MapPin className="w-6 h-6 mb-2 text-white-600" />,
      title: "Perfect Location",
      description: "Based in the heart of the Great Barrier Reef Marine Park",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[60vh] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <img
            src={getImageUrl('about-hero.jpg')}
            alt="Get Around Island Boat Tours"
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
              About Our Tours
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your gateway to experiencing the natural wonders of Magnetic
              Island's waters
            </motion.p>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {feature.icon}
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to Paradise</h2>
              <p className="text-gray-600 text-lg">
                Situated in the heart of the Great Barrier Reef and National
                Park Heritage Zone, Get Around Island Boat Tours offers an
                authentic and flexible approach to exploring Magnetic Island's
                stunning waters. Whether you're keen to snorkel over vibrant
                coral reefs, fish for mackerel and coral trout, or simply soak
                in a magnificent sunset, our guide will ensure your journey is
                memorable, safe, and tailored to your preferences.
              </p>
            </div>
            <div>
              <img
                src={getImageUrl('cliff.jpg')}
                alt="Boat tour experience"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="md:order-2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-gray-600 text-lg mb-4">
                We provide all the equipment you need for a perfect day out on
                the water. From fishing gear and snorkeling equipment to safety
                essentials and refreshments, we've got you covered.
              </p>
              <ul className="grid grid-cols-2 gap-4 text-gray-600">
                <li>✓ Fishing Equipment</li>
                <li>✓ Life Jackets</li>
                <li>✓ Stinger Suits</li>
                <li>✓ First Aid Kit</li>
                <li>✓ Snorkel Equipment</li>
                <li>✓ Dry Storage</li>
                <li>✓ Esky</li>
                <li>✓ Refreshments</li>
              </ul>
            </div>
            <div className="md:order-1">
              <img
                src={getImageUrl('about-main.jpg')}
                alt="Tour equipment"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            to={`/contact?type=General Enquiry`}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 inline-block text-lg"
            onClick={() => trackEvent("Button", "Navigation", "Click", "To Contact Us", 'Contact Us About')}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;