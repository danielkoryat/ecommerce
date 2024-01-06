import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  fetchWatchlistAsync,
  removeFromWatchlistAsync,
  addToWatchlistAsync,
} from "../app/thunks/watchlistThunks.js";

const useWatchlist = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { items: watchlist, error } = useSelector((state) => state.watchlist);
  const { id:userid } = useSelector((state) => state.user);

  const isProductInWatchlist = (productId) => {
    return watchlist.some((item) => item.id === productId);
  };

  const addToWatchlist = async(productId) => {
    setLoading(true);
    try {
      await dispatch(addToWatchlistAsync({userid,productId})).unwrap();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const removeFromWatchlist = (productId) => {
    dispatch(removeFromWatchlistAsync(_id, productId));
  };

  // Function to fetch the watchlist
  const fetchWatchlist = () => {
    dispatch(fetchWatchlistAsync(_id));
  };

  return {
    isProductInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    fetchWatchlist,
    loading,
    error,
  };
};

export default useWatchlist;
