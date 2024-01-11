import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  fetchWatchlistAsync,
  removeFromWatchlistAsync,
  addToWatchlistAsync,
} from "../app/thunks/watchlistThunks.js";

const useWatchlist = (productId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const watchlist = useSelector((state) => state.watchlist.items);
  const userid = useSelector((state) => state.user.id);
  const error = useSelector((state) => state.watchlist.error);

  // Check if the product is in the watchlist and update the state
  useEffect(() => {
    setIsInWatchlist(watchlist.some((item) => item._id === productId));
  }, [watchlist, productId]); // Depend on watchlist and productId

  const addToWatchlist = async (productId) => {
    setLoading(true);
    try {
      await dispatch(addToWatchlistAsync({ userid, productId })).unwrap();
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (productId) => {
    setLoading(true);
    try {
      await dispatch(removeFromWatchlistAsync({userid, productId})).unwrap();
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the watchlist
  const fetchWatchlist = () => {
    dispatch(fetchWatchlistAsync(userid));
  };

  return {
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    fetchWatchlist,
    loading,
    error,
  };
};

export default useWatchlist;
