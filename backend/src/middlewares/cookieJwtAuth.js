import jwt from "jsonwebtoken";
import CustomError from "../errors/customError.js";
import { genateAccessTokenFromRefreshToken } from "../utils/authUtils.js";

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const accessToken = genateAccessTokenFromRefreshToken(req, res);
      if (accessToken) {
        return next();
      }
    } else {
      res.clearCookie("token");
      throw new CustomError(error.message, 401);
    }
  }
};

export default cookieJwtAuth;
