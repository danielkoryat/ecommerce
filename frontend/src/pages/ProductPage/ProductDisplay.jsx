import React from 'react';
import Spinner from "../../components/Spinner";

const ProductDisplay = ({
  product,
  isEditing,
  setIsEditing,
  handleDelete,
  deleteLoading,
  deleteError,
  isSeller,
  pathToDefaultImage
}) => {

  if (!product) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  return (
    <div className="container mx-auto my-8 p-5 bg-white shadow-xl rounded-xl">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.imageUrls && product.imageUrls[0] ? product.imageUrls[0] : pathToDefaultImage}
            alt={product.name}
            className="rounded-lg mb-4 md:mb-0 max-w-xs"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <p className="text-gray-800 font-semibold">
            Price: <span className="text-green-500">${product.price}</span>
          </p>
          <p className="text-gray-800 font-semibold">
            Amount: <span className="text-blue-500">{product.amount}</span>
          </p>
          <p className="text-gray-800 font-semibold">
            Seller: <span className="text-blue-500">{product.seller.username}</span>
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Posted At: {new Date(product.createdAt).toLocaleDateString()}
          </p>
          {isSeller && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 transition-colors"
              >
                {isEditing ? "Hide" : "Edit"}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              {deleteError && <p className="text-red-500">{deleteError}</p>}
            </div>
          )}
        </div>
      </div>
      {deleteLoading && <Spinner />}
    </div>
  );
};

export default ProductDisplay;