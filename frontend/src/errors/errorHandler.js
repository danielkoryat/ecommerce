export const errorContext = {
  login: "login",
  register: "register",
  logout: "logout",
  product: "product",
  review: "review",
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
  const defaultMessage = "An unexpected error occurred. Please try again later.";
  let message = response.data?.message || defaultMessage;

  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
      return "Invalid request. Please check your input.";

    case HTTP_STATUS.UNAUTHORIZED:
      return context === errorContext.login ?
        "Invalid username or password. Please try again." :
        "Unauthorized. Please log in again.";

    case HTTP_STATUS.FORBIDDEN:
      return "Forbidden. You don't have permission to perform this action.";

    case HTTP_STATUS.NOT_FOUND:
      return "The requested resource was not found.";

    case HTTP_STATUS.CONFLICT:
      if (context === errorContext.register) {
        if (message.includes("email")) {
          return "This email already exists.";
        } else if (message.includes("username")) {
          return "This username already exists.";
        }
      }
      return message;

    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return "Internal server error. Please try again later.";

    default:
      return message;
  }
};