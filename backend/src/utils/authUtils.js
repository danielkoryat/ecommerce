import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days for refresh token
  secure: process.env.NODE_ENV === "production",
};

export const setTokensCookies = (res, req, user) => {
  const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "10s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + 15 * 60 * 1000),
  }); // 15 minutes for access token

  res.cookie("refreshToken", refreshToken, cookieOptions);
};

export const clearTokensCookies = (res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};

export const genateAccessTokenFromRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(new CustomError("No refresh token provided", 401));
  }
  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "10s",
    });

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      expires: new Date(Date.now() + 15 * 60 * 1000),
    }); // 15 minutes for access token

    req.user = user;
    next();
  } catch (error) {
    next(new CustomError("Invalid refresh token", 401));
  }
};
