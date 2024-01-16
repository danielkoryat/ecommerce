export const errorContext = {
  login: "login",
  register: "register",
  logout: "logout",
  product: "product",
  review: "review",
  watchlist: "watchlist",
  dashboard: "dashboard",
  editProfile: "editProfile",
  search: "search",
};

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const getErrorMessage = (response, context) => {
  if (!response) {
    return "The server is not responding. Please check your internet connection and try again later. If the problem persists, the server may be down.";
  }

  const status = response.status;
  const defaultMessage =
    "An unexpected error occurred. Please try again later.";
  let message = response.data?.message || defaultMessage;

  const getContextualMessage = (context, status, message) => {
    const contextMessages = {
      [errorContext.login]: {
        [HTTP_STATUS.BAD_REQUEST]:
          "Invalid email or password. Please try again.",
        [HTTP_STATUS.UNAUTHORIZED]:
          "Login failed. Please check your credentials and try again.",
        [HTTP_STATUS.NOT_FOUND]: "Account not found. Please register.",
        [HTTP_STATUS.FORBIDDEN]:
          "Your account has been disabled. Please contact support.",
      },
      [errorContext.register]: {
        [HTTP_STATUS.BAD_REQUEST]:
          "Please ensure all fields are filled out correctly.",
        [HTTP_STATUS.CONFLICT]: message.includes("email")
          ? "An account with this email already exists."
          : "An account with this username already exists.",
      },
      [errorContext.logout]: {
        [HTTP_STATUS.UNAUTHORIZED]:
          "You are not logged in. Please log in to continue.",
        [HTTP_STATUS.FORBIDDEN]:
          "You do not have the required permissions to log out.",
      },
      [errorContext.product]: {
        [HTTP_STATUS.NOT_FOUND]:
          "Product not found. Please check the product ID and try again.",
        [HTTP_STATUS.BAD_REQUEST]:
          "Invalid product information. Please review the details and try again.",
      },
      [errorContext.review]: {
        [HTTP_STATUS.BAD_REQUEST]:
          "Your review could not be submitted. Please check your input and try again.",
        [HTTP_STATUS.NOT_FOUND]: "The product for review was not found.",
      },
      [errorContext.watchlist]: {
        [HTTP_STATUS.BAD_REQUEST]:
          "Unable to process watchlist operation. Please check your input and try again.",
        [HTTP_STATUS.NOT_FOUND]:
          "Item not found for watchlist addition/removal.",
      },
      [errorContext.dashboard]: {
        [HTTP_STATUS.UNAUTHORIZED]:
          "Access to dashboard denied. Please log in with an appropriate account.",
        [HTTP_STATUS.FORBIDDEN]:
          "You do not have the required permissions to view the dashboard.",
      },
      [errorContext.editProfile]: {
        [HTTP_STATUS.BAD_REQUEST]:
          "Invalid profile details. Please check your input and try again.",
        [HTTP_STATUS.CONFLICT]:
          "The updated email or username conflicts with an existing user.",
      },
      [errorContext.search]: {
        [HTTP_STATUS.BAD_REQUEST]:
          "Invalid search query. Please adjust your search and try again.",
        [HTTP_STATUS.NOT_FOUND]: "No results found for your search.",
      },
      // Default message for unknown context
      default: {
        [HTTP_STATUS.BAD_REQUEST]:
          "Invalid request. Please check your input and try again.",
        [HTTP_STATUS.UNAUTHORIZED]:
          "Unauthorized action. Please log in and try again.",
        [HTTP_STATUS.FORBIDDEN]: "Access denied. Please contact support.",
      },
    };

    // First, try to get a contextual message based on the context and status provided
    if (contextMessages[context] && contextMessages[context][status]) {
      return contextMessages[context][status];
    }
    // If no contextual message is found, try to get a message from the default context
    if (contextMessages.default[status]) {
      return contextMessages.default[status];
    }
    // If no message is found at all, return the default message
    return message;
  };

  return getContextualMessage(context, status, message);
};
