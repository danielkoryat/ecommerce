const Review = ({ username, comment }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="font-semibold">{username}</p>
      <p className="text-sm text-gray-600">{comment}</p>
    </div>
  );
};

export default Review;
