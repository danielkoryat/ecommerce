import jwt from "jsonwebtoken";
import CustomError from "../errors/customError.js";
import { generateAccessTokenFromRefreshToken } from "../utils/authUtils.js";

const cookieJwtAuth = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (req.cookies.refreshToken) {
      generateAccessTokenFromRefreshToken(req, res, next);
    } else {
      res.clearCookie("token");
      next(new CustomError(error.message, 401));
    }
  }
};


export default cookieJwtAuth;
