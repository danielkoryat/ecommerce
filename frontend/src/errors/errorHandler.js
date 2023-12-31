export const errorContext = {
    login: "login",
    register: "register",
    logout: "logout",
    product: "product",
    review: "review",
    watchlist: "watchlist",
  };
  
  const HTTP_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  };
  
  /**
   * Retrieves a user-friendly error message based on 
   * the server response and the context of the error.
   *
   * @param {Object} response - The HTTP response object
   * @param {String} context - The context of the operation
   *   which resulted in an error
   * @return {String} A context-specific error message
   */
  export const getErrorMessage = (response, context) => {
    if (!response) {
      return "The server is not responding. Please check your internet connection and try again later. If the problem persists, the server may be down.";
    }
  
    const status = response.status;
    const defaultMessage = "An unexpected error occurred. Please try again later.";
    let message = response.data?.message || defaultMessage;
  
    // Function to handle context-specific messages
    const getContextualMessage = (context, message) => {
      switch (context) {
        case errorContext.login:
          return "There was an issue during the login process. " + message;
        case errorContext.register:
          return "There was an issue during registration. " + message;
        case errorContext.logout:
          return "There was an issue during logout. " + message;
        case errorContext.product:
          return "There was an issue with the product operation. " + message;
        case errorContext.review:
          return "There was an issue with submitting your review. " + message;
        case errorContext.watchlist:
          return "There was an issue with the watchlist operation. " + message;
        default:
          return message;
      }
    };
  
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
    if (context === errorContext.login) return getContextualMessage(context, "Invalid email or password.");
        return getContextualMessage(context, "Invalid request. Please check your input.");
  
      case HTTP_STATUS.UNAUTHORIZED:
        return getContextualMessage(context, "Unauthorized. Please log in again.");
  
      case HTTP_STATUS.FORBIDDEN:
        return getContextualMessage(context, "Forbidden. You don't have permission to perform this action.");
  
      case HTTP_STATUS.NOT_FOUND:
        return getContextualMessage(context, "The requested resource was not found.");
  
      case HTTP_STATUS.CONFLICT:
        if (context === errorContext.register) {
          if (message.includes("email")) {
            return getContextualMessage(context, "This email already exists.");
          } else if (message.includes("username")) {
            return getContextualMessage(context, "This username already exists.");
          }
        }
        return getContextualMessage(context, message);
  
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return getContextualMessage(context, "Internal server error. Please try again later.");
  
      default:
        return getContextualMessage(context, message);
    }
  };