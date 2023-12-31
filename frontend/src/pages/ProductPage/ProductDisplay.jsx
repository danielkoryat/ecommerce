import React from "react";
import Spinner from "../../components/Spinner";
import useFetch from "../../hooks/useFetch";
import { errorContext } from "../../errors/errorHandler";
import watchlistService from "../../api/services/WatchlistService";
import { setAlert } from "../../app/alertSlice";
import { useDispatch } from "react-redux";
import ErrorNotification from "../../components/ErrorNotification";

const ProductDisplay = ({
  product,
  isEditing,
  setIsEditing,
  handleDelete,
  deleteLoading,
  deleteError,
  isSeller,
  pathToDefaultImage,
  isAuthenticated,
}) => {
  const dispatch = useDispatch();
  const {
    fetchData: addToWatchlist,
    loading: addToWatchlistLoading,
    serverError: addToWatchlistServerError,
  } = useFetch(watchlistService.addProductToWatchlist, errorContext.watchlist);

  const handleAddToWatchlist = async () => {
    const data = await addToWatchlist(product._id);
    if (!data) {
      dispatch(setAlert({ type: "error", message: addToWatchlistServerError }));
    } else {
      dispatch(
        setAlert({ type: "success", message: "Product added to watchlist" })
      );
    }
  };

  const removeProductFromWatchlist = async () => {
    // TODO: Remove product from watchlist
  };

  return !product ? (
    <ErrorNotification
      title={"Product not found"}
      message={
        "This product could not be found, if you believe this is an error, please contact us"
      }
    />
  ) : (
    <div className="container mx-auto my-8 p-5 bg-white shadow-xl rounded-xl">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={
              product.imageUrls && product.imageUrls[0]
                ? product.imageUrls[0]
                : pathToDefaultImage
            }
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
            <span className="text-blue-500 ml-2">
              {product.categories.map((category) => category.name).join(", ")}
            </span>
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Posted At: {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-8">
        {isSeller && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {isEditing ? "Hide" : "Edit"}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
        {isAuthenticated && (
          <button
            onClick={handleAddToWatchlist}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 md:mt-0 hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
          >
            Add to Watchlist
          </button>
        )}
        {deleteError && (
          <p className="text-red-500 mt-2 md:mt-0">{deleteError}</p>
        )}
      </div>

      {deleteLoading && <Spinner />}
    </div>
  );
};

export default ProductDisplay;
