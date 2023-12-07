export const getErrorMessage = (response) => {
  if (response) {
    const status = response.status;
    switch (status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Unauthorized. Please log in.";
      case 403:
        return "Forbidden. You don't have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        if (response.data?.message.includes("email")) {
          return "An account with this email already exists.";
        } else if (response.data?.message.includes("username")) {
          return "An account with this username already exists.";
        } else {
          return "One or more fields are allready in use.";
        }

      case 500:
        return "Internal server error. Please try again later.";
      default:
        return response.data?.message || "An unexpected error occurred.";
    }
  } else {
    return "The server is not responding. Please check your internet connection and try again later. If the problem persists, the server may be down.";
  }
};
