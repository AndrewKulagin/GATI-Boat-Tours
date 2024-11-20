import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TOURS } from "../data/tours";
import { MapPin, Phone, Anchor } from "lucide-react";
import { motion } from "framer-motion";
import GoogleReviews from '../components/GoogleReviews';

const GALLERY_IMAGES = [
  {
    src: "/images/h1.jpg",
    alt: "Home Image",
  },
  {
    src: "/images/h2.jpg",
    alt: "Home Image",
  },
  {
    src: "/images/h3.jpg",
    alt: "Home Image",
  },
  {
    src: "/images/h4.jpg",
    alt: "Home Image",
  },
  {
    src: "/images/h5.jpg",
    alt: "Home Image",
  },
  {
    src: "/images/h6.jpg",
    alt: "Home Image",
  },
  {
    src: "/images/h7.jpg",
    alt: "Home Image",
  },
  {
    src: "/images/h8.jpg",
    alt: "Home Image",
  },
  {
    src: "/images/h9.jpg",
    alt: "Home Image",
  },
  {
    src: "/images/h10.jpg",
    alt: "Home Image",
  }
];



const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const exploreToursRef = useRef(null);

  const handleScrollToTours = () => {
    exploreToursRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  useEffect(() => {
    const loadImages = () => {
      const imagePromises = GALLERY_IMAGES.map((img) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = img.src;
          image.onload = resolve;
          image.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch((err) => console.error("Error loading images:", err));
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with lower z-index */}
      <div className="relative h-screen z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        <div className="absolute inset-0 z-0">
          {imagesLoaded &&
            GALLERY_IMAGES.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={image.alt}
                className="absolute w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            ))}
        </div>

        {!imagesLoaded && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-0">
            <div className="text-white text-xl">Loading...</div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center text-center z-20">
          <div className="text-white max-w-4xl px-4 backdrop-blur-sm bg-black/70 p-8 rounded-lg">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Discover Magnetic Island
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                to="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all hover:scale-105 inline-block"
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
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJxYB0rUYBfmkRI_Jk0D9nvCo" target="_blank" rel="noopener noreferrer"className="hover:underline">
              Nelly Bay Harbour, Kelly Street
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <a href="tel:0448434292" className="hover:underline">
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
              <Link to={tour.path}>
                <img
                  src={`/images/${tour.image}`}
                  alt={tour.name}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <Link
                  to={tour.path}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  Learn More <span className="ml-2">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 transition-all hover:scale-105 inline-block"
          >
            Book Your Adventure
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-8">
            What Our Customers Say
          </h2>
          <GoogleReviews />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
