import { useState } from "react";
import { getErrorMessage } from "../errors/errorHandler.js";

function useFetch(apiCallFunction, customErrorContext) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Define a fetch function that can be called manually
  const fetchData = async (...fetchParams) => {
    setLoading(true);
    try {
      const result = await apiCallFunction(...fetchParams);
      return result; 
    } catch (err) {
      const errorMessage = getErrorMessage(err.response, customErrorContext);
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {  loading, serverError, fetchData };
}

export default useFetch;