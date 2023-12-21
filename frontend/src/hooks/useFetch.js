import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getErrorMessage } from "../errors/errorHandler";
import { logoutUserAsync } from "../app/thunks/userThunks";

function useFetch(apiCallFunction, customErrorContext) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Clears the current server error state.
  const clearServerError = useCallback(() => setServerError(null), []);

  // Fetch data with the provided API call function and parameters.
  const fetchData = useCallback(async (...fetchParams) => {
    setLoading(true);
    try {
      const result = await apiCallFunction(...fetchParams);
      return result;
    } catch (err) {
      if (err.response) {
        // Logout on 401 Unauthorized and navigate to login page.
        if (err.response.status === 401) {
          dispatch(logoutUserAsync());
          navigate("/login");
        }
        // Use a utility function to determine the error message to set.
        setServerError(getErrorMessage(err.response, customErrorContext));
      } else {
        // Handle errors without a response (e.g., network or timeout errors).
        setServerError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, [apiCallFunction, customErrorContext, dispatch, navigate]);

  return { loading, serverError, fetchData, clearServerError };
}

export default useFetch;