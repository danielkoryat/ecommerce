import React, { useState } from 'react';

const StarRating = ({ onRating, rating, isDisabled }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const keyIndex = index + 1;
        return (
          <button
            type="button"
            key={keyIndex}
            className={`h-6 w-6 ${keyIndex <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600`}
            onClick={() => {
              if (!isDisabled) {
                onRating(keyIndex);
              }
            }}
            {...(!isDisabled && {
              onMouseEnter: () => setHover(keyIndex),
              onMouseLeave: () => setHover(rating),
            })}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;