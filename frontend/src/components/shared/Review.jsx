import React from 'react';
import StarRating from './StartRating';

const Review = ({ username, comment, rating }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow space-y-2">
      <div className="flex items-center space-x-2">
        <p className="font-semibold">{username}</p>
        {/* Display the StarRating component */}
        <div className="flex items-center">
        <StarRating rating={rating} onRating={() => {}} isDisabled={true} />
        </div>
      </div>
      <p className="text-sm text-gray-600">{comment}</p>
    </div>
  );
};

export default Review;