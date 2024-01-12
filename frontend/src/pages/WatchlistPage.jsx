import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useSelector } from "react-redux";
import ErrorNotification from "../components/ErrorNotification.jsx";

const WatchlistPage = () => {
  const watchlistItems = useSelector((state) => state.watchlist.items);

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">My Watchlist</h2>
      {watchlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {watchlistItems.map((product) => (
            <ProductCard key={product._id} product={product} isAuthenticated />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default WatchlistPage;
