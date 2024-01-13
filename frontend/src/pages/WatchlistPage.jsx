import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useSelector } from "react-redux";
import ErrorNotification from "../components/ErrorNotification.jsx";

const WatchlistPage = () => {
  const watchlistItems = useSelector((state) => state.watchlist.items);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "green" }}>
        My Watchlist
      </h1>
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
