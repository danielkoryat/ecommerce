import React from 'react';

const NoProductsNotification = ({context}) => {

  const mainMessage = context === 'shop' ? 'No Products Available' : 'We Couldnt Find that Product';
  const subMessage = context === 'shop' ? 'Were sorry, but there are no products available at the moment. Please check back later.'
   : 'Sorry but that product you are looking for could not be found. Please check back later. if you think this is an error, please contact us.';


  return (
    <div className="bg-white shadow-lg rounded-md p-6 max-w-sm mx-auto mt-10">
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h2a2 2 0 00-2-2v2zm0 4v2a2 2 0 002-2h-2zm18 0h2a2 2 0 002-2v2zm0-4v-2a2 2 0 00-2 2h2zM12 4v7m0 4v4m-7 0h3m4 0h3m-7 0a4 4 0 114 0"
          />
        </svg>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {mainMessage}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {subMessage}
        </p>
      </div>
    </div>
  );
};

export default NoProductsNotification;