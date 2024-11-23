import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TOURS } from '../data/tours';
import { trackEvent } from "../App";

const TourPage = () => {
  const { id } = useParams();
  const tour = TOURS.find(t => t.path === `/tours/${id}`);
  // Track page view for specific tour
  React.useEffect(() => {
    trackEvent('Page View', 'Tour Page', tour.name);
  }, [tour.name]);

  if (!tour) {
    return <div>Tour not found</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        {/* Hero Image */}
        <div className="h-[60vh] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <img
            src={`/images/${tour.image}`}
            alt={tour.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Centered Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {tour.name}
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {tour.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to={`/contact?type=Tour&tourId=${tour.id}`}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 inline-block text-lg"
                onClick={() => trackEvent("Button", "Click", "Navigation", "To Contact Us", "Tour", "Book", tour.name)}
              >
                Book This Tour
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 text-center">
            <div className="min-w-[160px]">
              <h3 className="font-semibold text-xl mb-2">Duration</h3>
              <p>{tour.tourInfo.duration}</p>
            </div>
            <div className="min-w-[160px]">
              <h3 className="font-semibold text-xl mb-2">Group Size</h3>
              <p>{tour.tourInfo.groupSize}</p>
            </div>
            <div className="min-w-[160px]">
              <h3 className="font-semibold text-xl mb-2">Skill Level</h3>
              <p>{tour.tourInfo.skillLevel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-24">
          {tour.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 0 ? 'md:grid-flow-col' : 'md:grid-flow-col-dense'
              }`}
            >
              {/* Text Content */}
              <div className={`flex flex-col justify-center ${
                index % 2 === 0 ? 'md:order-1' : 'md:order-2'
              }`}>
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                <p className="text-gray-600 text-lg">{section.content}</p>
              </div>

              {/* Image */}
              <div className={
                index % 2 === 0 ? 'md:order-2' : 'md:order-1'
              }>
                <img
                  src={`/images/${section.image}`}
                  alt={section.title}
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            to={`/contact?type=Tour&tourId=${tour.id}`}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 inline-block text-lg"
            onClick={() => trackEvent("Button", "Click", "Navigation", "To Contact Us", "Tour", "Book", tour.name)}
          >
            Book Your {tour.name} Adventure
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourPage;