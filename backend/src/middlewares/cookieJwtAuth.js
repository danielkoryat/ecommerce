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
    const refreshToken = req.cookies.refreshToken;
    if (error instanceof jwt.TokenExpiredError && refreshToken) {
      const accessToken = genateAccessTokenFromRefreshToken(refreshToken);
      if (accessToken) {
        res.cookie("token", accessToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes for access token
        });
        return next();
      }
    } else {
      res.clearCookie("token");
      throw new CustomError(error.message, 401);
    }
  }
};

export default cookieJwtAuth;
