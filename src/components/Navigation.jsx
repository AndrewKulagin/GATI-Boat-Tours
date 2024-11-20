import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { TOURS } from '../data/tours';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="bg-blue-600 text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Get Around the Island
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/about" className="hover:text-gray-300">About Us</Link>
            
            {/* Tours Dropdown */}
            <div className="relative group">
              <button className="flex items-center hover:text-gray-300 py-2">
                Tours <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute hidden group-hover:block hover:block w-48 bg-white text-gray-800 shadow-lg rounded-md mt-0">
                <div className="py-2">
                  {TOURS.map(tour => (
                    <Link
                      key={tour.id}
                      to={tour.path}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {tour.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/faq" className="hover:text-gray-300">FAQ</Link>
            <Link 
              to="/contact" 
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Book
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 hover:bg-blue-700">Home</Link>
            <Link to="/about" className="block px-3 py-2 hover:bg-blue-700">About Us</Link>
           
            {/* Mobile Tours */}
            <button
              onClick={() => setOpenDropdown(openDropdown === 'tours' ? null : 'tours')}
              className="w-full text-left px-3 py-2 hover:bg-blue-700 flex justify-between items-center"
            >
              Tours <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === 'tours' && (
              <div className="pl-6">
                {TOURS.map(tour => (
                  <Link
                    key={tour.id}
                    to={tour.path}
                    className="block px-3 py-2 hover:bg-blue-700"
                  >
                    {tour.name}
                  </Link>
                ))}
              </div>
            )}
            <Link to="/faq" className="block px-3 py-2 hover:bg-blue-700">FAQ</Link>
            <div className="px-3 pt-2 pb-1">
              <Link 
                to="/contact" 
                className="block text-center py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
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