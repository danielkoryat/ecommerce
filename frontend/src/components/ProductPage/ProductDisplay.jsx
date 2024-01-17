import React from "react";
import { useDispatch } from "react-redux";
import ErrorNotification from "../shared/ErrorNotification";
import defaultProductImage from "../../assets/images/default-product-image.png";
import { Button } from "@material-tailwind/react";
import useWatchlist from "../../hooks/useWatchlist";

const ProductDisplay = ({
  product,
  isEditing,
  setIsEditing,
  handleDelete,
  deleteLoading,
  deleteError,
  isSeller,
  isAuthenticated,
}) => {
  const dispatch = useDispatch();
  const {
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    loading: watchlistLoading,
    error: watchlistError,
  } = useWatchlist(product?._id);

  if (!product) {
    return (
      <ErrorNotification
        title="Product not found"
        message="This product could not be found, if you believe this is an error, please contact us"
      />
    );
  }
//TODO implament a carusal
  const imageUrl = product.imageUrls[0] || defaultProductImage; 
  const categories = product.categories
    .map((category) => category.name)
    .join(", ");

  return (
    <div className="container mx-auto my-8 p-5 bg-white shadow-xl rounded-xl">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={imageUrl}
            alt={product.name}
            className="rounded-lg mb-4 md:mb-0 max-w-xs"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <p className="mb-2">
            <span className="text-gray-800 font-semibold">Price:</span>
            <span className="text-green-500 ml-2">${product.price}</span>
          </p>
          <p className="mb-2">
            <span className="text-gray-800 font-semibold">Amount:</span>
            <span className="text-blue-500 ml-2">{product.amount}</span>
          </p>
          <p className="mb-4">
            <span className="text-gray-800 font-semibold">Seller:</span>
            <span className="text-blue-500 ml-2">
              {product.seller.username}
            </span>
          </p>
          <p className="mb-4">
            <span className="text-gray-800 font-semibold">Categories:</span>
            <span className="text-blue-500 ml-2">{categories}</span>
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Posted At: {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-8">
        {isSeller && (
          <div className="flex space-x-2">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {isEditing ? "Hide" : "Edit"}
            </Button>
            <Button onClick={handleDelete} color="yellow">
              Delete
            </Button>
          </div>
        )}
        {isAuthenticated && !isSeller && (
          <Button
            onClick={isInWatchlist ? removeFromWatchlist : addToWatchlist }
            color={isInWatchlist ? "yellow" : "green"}
            loading={watchlistLoading}
            className="w-full md:w-auto"
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
        )}
        
      </div>
    </div>
  );
};

export default ProductDisplay;
