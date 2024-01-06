import jwt from "jsonwebtoken";
import CustomError from "../errors/customError.js";
import { genateAccessTokenFromRefreshToken } from "../utils/authUtils.js";

const cookieJwtAuth = (req, res, next) => {
  try {
    //TODO test the refresh token auth
    const token = req.cookies.accessToken;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      genateAccessTokenFromRefreshToken(req, res, next);
    } else {
      res.clearCookie("token");
      next(new CustomError(error.message, 401));
    }
  }
};


export default cookieJwtAuth;
