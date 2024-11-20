import React from 'react';
import GoogleReviews from '../components/GoogleReviews';

const Reviews = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-16">What Our Customers Say</h1>
      
      {/* Google Reviews Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Google Reviews</h2>
        <GoogleReviews />
      </div>
    </div>
  );
};

export default Reviews;
