import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { TOURS } from '../data/tours';
import { trackEvent } from "../App";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  // Effect to handle page changes
  useEffect(() => {
    // Close mobile menu when location changes
    setIsOpen(false);
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location]);

  // Helper function to handle mobile navigation clicks
  const handleMobileClick = (eventLabel) => {
    setIsOpen(false); // Close mobile menu
    trackEvent('Navigation', 'Click', eventLabel);
  };

  // Helper function to check if the current path matches the link
  const isCurrentPath = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Helper function to get link classes based on current path
  const getLinkClasses = (path, isMobile = false) => {
    const baseClasses = isMobile 
      ? "block px-3 py-2 hover:bg-blue-700"
      : "hover:text-gray-300";
    
    const activeClasses = isMobile
      ? "font-bold bg-blue-700"
      : "font-bold border-b-2 border-white";

    return `${baseClasses} ${isCurrentPath(path) ? activeClasses : ''}`;
  };

  return (
    <nav className="bg-blue-600 text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold"
              onClick={() => trackEvent("Navigation", "To Home", 'Link', 'Click', 'Home Logo')}
            >
              Get Around Island
            </Link>
          </div>
         
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={getLinkClasses('/')}
              onClick={() => trackEvent("Button", "To Home", 'Navigation', 'Click', 'Home')}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={getLinkClasses('/about')}
              onClick={() => trackEvent("Button", "To About Us",'Navigation', 'Click', 'About Us')}
            >
              About Us
            </Link>
           
            {/* Tours Dropdown */}
            <div className="relative group">
              <button 
                className={`flex items-center hover:text-gray-300 py-2 ${location.pathname.includes('/tours') ? 'font-bold border-b-2 border-white' : ''}`}
                onClick={() => trackEvent("Button", "Click", 'View', 'Tours Dropdown')}
              >
                Tours <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute hidden group-hover:block hover:block w-48 bg-white text-gray-800 shadow-lg rounded-md mt-0">
                <div className="py-2">
                  {TOURS.map(tour => (
                    <Link
                      key={tour.id}
                      to={tour.path}
                      className={`block px-4 py-2 hover:bg-gray-100 ${isCurrentPath(tour.path) ? 'font-bold bg-gray-50' : ''}`}
                      onClick={() => trackEvent("Button", "To Tour", 'Navigation', 'Click', `Tour - ${tour.name}`)}
                    >
                      {tour.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link 
              to="/boat-hire" 
              className={getLinkClasses('/boat-hire')}
              onClick={() => trackEvent("Button", "To Boat Hire",'Navigation', 'Click', 'Boat Hire')}
            >
              Boat Hire
            </Link>
            <Link 
              to="/faq" 
              className={getLinkClasses('/faq')}
              onClick={() => trackEvent("Button", "To FAQ",'Navigation', 'Click', 'FAQ')}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className={`bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 ${
                isCurrentPath('/contact') ? 'ring-2 ring-white' : ''
              }`}
              onClick={() => trackEvent("Button", "To Book", 'Navigation', 'Click', 'Book Button')}
            >
              Book
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => {
                setIsOpen(!isOpen);
                trackEvent('Click', 'Navigation', 'Toggle', 'Mobile Menu');
              }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={getLinkClasses('/', true)}
              onClick={() => handleMobileClick("Button", "To Home", 'Mobile Home')}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={getLinkClasses('/about', true)}
              onClick={() => handleMobileClick("Button", "To About Us", 'Mobile About Us')}
            >
              About Us
            </Link>
           
            {/* Mobile Tours */}
            <button
              onClick={() => {
                setOpenDropdown(openDropdown === 'tours' ? null : 'tours');
                trackEvent("Click", 'Navigation', 'Toggle', 'Mobile Tours Dropdown');
              }}
              className={`w-full text-left px-3 py-2 hover:bg-blue-700 flex justify-between items-center ${
                location.pathname.includes('/tours') ? 'font-bold bg-blue-700' : ''
              }`}
            >
              Tours <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === 'tours' && (
              <div className="pl-6">
                {TOURS.map(tour => (
                  <Link
                    key={tour.id}
                    to={tour.path}
                    className={`block px-3 py-2 hover:bg-blue-700 ${
                      isCurrentPath(tour.path) ? 'font-bold bg-blue-700' : ''
                    }`}
                    onClick={() => handleMobileClick("Button", "To Tour", `Mobile Tour - ${tour.name}`)}
                  >
                    {tour.name}
                  </Link>
                ))}
              </div>
            )}
            <Link 
              to="/boat-hire" 
              className={getLinkClasses('/boat-hire', true)}
              onClick={() => handleMobileClick("Button", "To Boat Hire", 'Mobile Boat Hire')}
            >
              Boat Hire
            </Link>
            <Link 
              to="/faq" 
              className={getLinkClasses('/faq', true)}
              onClick={() => handleMobileClick("Button", "To FAQ", 'Mobile FAQ')}
            >
              FAQ
            </Link>
            <div className="px-3 pt-2 pb-1">
              <Link
                to="/contact"
                className={`block text-center py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 ${
                  isCurrentPath('/contact') ? 'bg-blue-700 font-bold' : ''
                }`}
                onClick={() => handleMobileClick("Button", "To Book Now", 'Mobile Book Now')}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;