import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trackEvent } from "../App";
import { getImageUrl } from "../services/azureStorage";
import { Helmet } from "react-helmet";

const BoatHirePage = () => {
  return (
    <div>
      <Helmet>
        <title>Magnetic Island Boat Hire | Explore at Your Own Pace</title>
        <meta
          name="description"
          content="Discover Magnetic Island with our premium boat hire service. Perfect for fishing, snorkeling, or cruising, with full safety gear and expert briefings included. Book now!"
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative">
        {/* Hero Image */}
        <div className="h-[60vh] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <img
            src={getImageUrl("boat-hire-hero.jpg")}
            alt="Boat Hire"
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
              Boat Hire
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience the freedom of exploring Magnetic Island's stunning
              waters at your own pace with our premium boat hire service.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to={`/contact?type=Boat Hire`}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 inline-block text-lg"
                onClick={() =>
                  trackEvent(
                    "Button",
                    "Navigation",
                    "Click",
                    "To Boat Hire",
                    "Check Boat Hire Availability"
                  )
                }
              >
                Check Availability
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
              <p>Full or Half Day</p>
            </div>
            <div className="min-w-[160px]">
              <h3 className="font-semibold text-xl mb-2">Capacity</h3>
              <p>Up to 8 People Per Boat</p>
            </div>
            <div className="min-w-[160px]">
              <h3 className="font-semibold text-xl mb-2">License</h3>
              <p>Required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-24">
          {/* Freedom to Explore */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="flex flex-col justify-center md:order-1">
              <h2 className="text-3xl font-bold mb-4">Freedom to Explore</h2>
              <p className="text-gray-600 text-lg">
                Choose your own adventure with our well-maintained fleet of
                boats. Perfect for fishing, snorkeling, or simply cruising
                around the island's beautiful bays and beaches. Our boats are
                equipped with modern safety features and navigation equipment.
              </p>
            </div>
            <div className="md:order-2">
              <img
                src={getImageUrl("boat-freedom.jpg")}
                alt="Explore freely"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>

          {/* Comprehensive Equipment */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center md:grid-flow-col-dense"
          >
            <div className="flex flex-col justify-center md:order-2">
              <h2 className="text-3xl font-bold mb-4">
                Full Equipment Package
              </h2>
              <p className="text-gray-600 text-lg">
                Each boat comes fully equipped with safety gear, depth sounder,
                and marine radio. We also provide eskies for your refreshments,
                and can include fishing or snorkeling equipment upon request.
              </p>
            </div>
            <div className="md:order-1">
              <img
                src={getImageUrl("boat-equipment.jpg")}
                alt="Boat Equipment"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>

          {/* Expert Briefing */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="flex flex-col justify-center md:order-1">
              <h2 className="text-3xl font-bold mb-4">
                Comprehensive Briefing
              </h2>
              <p className="text-gray-600 text-lg">
                Before departure, we provide a thorough briefing on boat
                operation, safety procedures, and local navigation. We'll share
                tips on the best spots to visit and current weather conditions
                to ensure you have a safe and enjoyable experience.
              </p>
            </div>
            <div className="md:order-2">
              <img
                src={getImageUrl("boat-briefing.jpg")}
                alt="Expert Briefing"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            to={`/contact?type=Boat Hire`}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 inline-block text-lg"
            onClick={() =>
              trackEvent(
                "Button",
                "Navigation",
                "Click",
                "To Boat Hire",
                "Hire Dream Boat"
              )
            }
          >
            Hire Your Dream Boat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoatHirePage;
