import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import useFetch from "../hooks/useFetch.js";
import WatchlistService from "../api/services/WatchlistService.js";
import { errorContext } from "../errors/errorHandler.js";
import { useSelector } from "react-redux";
import Spinner from "../components/spinner.jsx";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistitemsIds, setWatchlistitemsIds] = useState(useSelector((state) => state.watchlist.items));
  const {loading,serverError,fetchData} = useFetch(WatchlistService.getUserWatchlist, errorContext);

  if (watchlistitemsIds) {
    useEffect(() => {
      const fetchWatchlist = async () => {
        const userid = useSelector((state) => state.user.id);
        const items = await fetchData(fetchData);
        setWatchlist(items);
      };
      fetchWatchlist();
    }, [watchlistitemsIds]);
  }

  
 

  return loading ? (
    <Spinner />
  ) : (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">My Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default WatchlistPage;
