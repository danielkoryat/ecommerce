
export const errorContext = {
  login: "login",
  register: "register",
};




export const getErrorMessage = (response, context) => {
  if (!response) {
    return "The server is not responding. Please check your internet connection and try again later. If the problem persists, the server may be down.";
  }
  
  const status = response.status;
  let message = response.data?.message || "";

  switch (status) {
    case 400:
      return "Invalid request. Please check your input.";

    case 401:
      if (context === 'login') {
        return "Invalid username or password. Please try again.";
      } else {
        return "Unauthorized. Please log in again.";
      }

    case 403:
      return "Forbidden. You don't have permission to perform this action.";

    case 404:
      return "The requested resource was not found.";

    case 409:
      if (context === 'register') {
        if (message.includes("email")) {
          return "this email already exists.";
        } else if (message.includes("username")) {
          return "this username already exists.";
        }
      }
      return message;

    case 500:
      return "Internal server error. Please try again later.";

    default:
      return message || "An unexpected error occurred.";
  }
};