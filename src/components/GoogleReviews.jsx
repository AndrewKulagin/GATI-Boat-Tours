import React from "react";
import { Star, User, ExternalLink } from "lucide-react";

const GoogleReviews = () => {
  const [reviews, setReviews] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch("/reviews.json")
      .then((response) => response.json())
      .then((data) => setReviews(data.reviews))
      .catch((err) => setError(err.message));
  }, []);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`inline ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 h-full">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{review.author_name}</h3>
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 w-full">
        <a
          href="https://www.google.com/maps/place/?q=place_id:ChIJxYB0rUYBfmkRI_Jk0D9nvCo"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-64 whitespace-nowrap inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Reviews on Google
        </a>
        <a
          href="https://www.tripadvisor.com.au/Attraction_Review-g499655-d7208815-Reviews-Get_Around_Island_Boat_Tours_Hire-Magnetic_Island_Queensland.html"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-64 whitespace-nowrap inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Reviews on Tripadvisor
        </a>
      </div>
    </div>
  );
};

export default GoogleReviews;
