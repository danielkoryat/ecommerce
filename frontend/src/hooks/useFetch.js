import { useState } from "react";
import { getErrorMessage } from "../errors/errorHandler.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "../app/thunks/userThunks.js";
function useFetch(apiCallFunction, customErrorContext) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Define a fetch function that can be called manually
  const fetchData = async (...fetchParams) => {
    setLoading(true);
    try {
      const result = await apiCallFunction(...fetchParams);
      return result; 
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logoutUserAsync());
        navigate("/login");
      }
      const errorMessage = getErrorMessage(err.response, customErrorContext);
      console.log(err);
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearServerError = () => {
    setServerError(null);
  };

  return {  loading, serverError, fetchData,clearServerError };
}

export default useFetch;