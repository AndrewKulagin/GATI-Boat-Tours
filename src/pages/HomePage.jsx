import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TOURS } from "../data/tours";
import { MapPin, Phone, Anchor } from "lucide-react";
import { motion } from "framer-motion";
import GoogleReviews from "../components/GoogleReviews";
import { trackEvent } from "../App";
import { getImageUrl } from "../services/azureStorage";
import { Helmet } from 'react-helmet';

const GALLERY_IMAGES = [
  {
    src: getImageUrl("h1.jpg"),
    alt: "Magnetic Island Beach",
  },
  {
    src: getImageUrl("h2.jpg"),
    alt: "Magnetic Island Map",
  },
  {
    src: getImageUrl("h3.jpg"),
    alt: "Magnetic Island Waves",
  }
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const exploreToursRef = useRef(null);

  const handleScrollToTours = () => {
    trackEvent("Button", "Scroll", "Click", "Tours Section");
    exploreToursRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Load first image separately
  useEffect(() => {
    const firstImage = new Image();
    firstImage.src = GALLERY_IMAGES[0].src;
    firstImage.onload = () => setFirstImageLoaded(true);
  }, []);

  // Load remaining images
  useEffect(() => {
    const loadRemainingImages = async () => {
      const imagePromises = GALLERY_IMAGES.slice(1).map((img) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = img.src;
          image.onload = resolve;
          image.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (err) {
        console.error("Error loading images:", err);
      }
    };

    if (firstImageLoaded) {
      loadRemainingImages();
    }
  }, [firstImageLoaded]);

  // Start slideshow only after all images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Magnetic Island Boat Tours & Hire | Snorkelling, Fishing & Sunset Cruises</title>
        <meta 
          name="description" 
          content="Experience Magnetic Island's longest-running boat tours. Join us for snorkelling, fishing, sunset cruises and private charters, or hire your own boat. Departing daily from Nelly Bay." 
        />
      </Helmet>
      {/* Hero Section */}
      <div className="relative h-screen z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="absolute inset-0 z-0">
          {firstImageLoaded && (
            <motion.img
              src={GALLERY_IMAGES[0].src}
              alt={GALLERY_IMAGES[0].alt}
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{
                opacity: !imagesLoaded || currentImageIndex === 0 ? 1 : 0,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}

          {imagesLoaded &&
            GALLERY_IMAGES.slice(1).map((image, index) => (
              <motion.img
                key={index + 1}
                src={image.src}
                alt={image.alt}
                className="absolute w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentImageIndex === index + 1 ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            ))}
        </div>

        {!firstImageLoaded && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-0">
            <div className="text-white text-xl">Loading...</div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center text-center z-20">
          <div className="text-white max-w-4xl px-4 backdrop-blur-sm bg-black/50 p-8 rounded-lg">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: firstImageLoaded ? 1 : 0,
                y: firstImageLoaded ? 0 : 20,
              }}
              transition={{ delay: 0.3 }}
            >
              Discover Magnetic Island
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: firstImageLoaded ? 1 : 0,
                y: firstImageLoaded ? 0 : 20,
              }}
              transition={{ delay: 0.5 }}
            >
              Experience the island's hidden treasures with Magnetic Island's
              longest-running boat tour
            </motion.p>
            <motion.div
              className="space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/contact?type=Tour"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all hover:scale-105 inline-block"
                onClick={() =>
                  trackEvent(
                    "Button",
                    "Navigation",
                    "Click",
                    "To Contact Us",
                    "Book Now"
                  )
                }
              >
                Book Now
              </Link>
              <button
                onClick={handleScrollToTours}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-gray-100 transition-all hover:scale-105 inline-block"
              >
                View Tours
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJxYB0rUYBfmkRI_Jk0D9nvCo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              onClick={() =>
                trackEvent(
                  "Link",
                  "External Link",
                  "Click",
                  "Google Maps Location"
                )
              }
            >
              Nelly Bay Harbour, Kelly Street
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <a
              href="tel:0448434292"
              className="hover:underline"
              onClick={() =>
                trackEvent("Link", "External Link", "Click", "Phone Number")
              }
            >
              0448 434 292
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5" />
            <span>Wheelchair Accessible</span>
          </div>
        </div>
      </div>

      {/* Featured Tours Section */}
      <div ref={exploreToursRef} className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-4">
          Explore Our Tours
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          From snorkeling adventures to sunset cruises, experience the best of
          Magnetic Island
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {TOURS.map((tour, index) => (
            <motion.div
              key={tour.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={tour.path}
                onClick={() => trackEvent("Tour", "View", tour.name)}
              >
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="space-x-4">
                  <Link
                    to={tour.path}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => trackEvent("Tour", "Learn More", tour.name)}
                  >
                    Learn More <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/contact?type=Tour"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 transition-all hover:scale-105 inline-block"
            onClick={() =>
              trackEvent(
                "Button",
                "Navigation",
                "To Contact Us",
                "Click",
                "Book Your Adventure"
              )
            }
          >
            Book Your Adventure
          </Link>
        </div>
      </div>

      {/* Boat Hire Section */}
      <motion.div
        className="bg-gray-50 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src={getImageUrl('boat-hire-hero.jpg')}
                alt="Boat Hire"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Boat Hire</h2>
              <p className="text-gray-600 text-lg mb-8">
                Experience the freedom of exploring Magnetic Island's stunning
                waters at your own pace. Our well-maintained fleet of boats is
                perfect for fishing, snorkeling, or simply cruising around the
                island's beautiful bays and beaches. Each boat comes fully equipped with safety gear
                and can accommodate up to 8 people.
              </p>
              <Link
                to="/boat-hire"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all hover:scale-105 inline-block"
                onClick={() =>
                  trackEvent(
                    "Button",
                    "Navigation",
                    "Click",
                    "To Boat Hire",
                    "Boat Hire Learn More"
                  )
                }
              >
                Learn More About Boat Hire
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Google Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <GoogleReviews />
      </div>
    </div>
  );
};

export default HomePage;
