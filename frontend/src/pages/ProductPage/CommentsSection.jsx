import React from 'react';

const CommentsSection = ({ productId }) => {

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="font-semibold">John Doe</p>
        <p className="text-sm text-gray-600">This product is amazing! I've been using it for a week now and I'm very satisfied.</p>
      </div>
     
      <form className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">Your Comment</label>
          <textarea id="comment" name="comment" rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentsSection;