import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days for refresh token
  secure: process.env.NODE_ENV === "production",
};

export const setTokensCookies = (res, req, user) => {
  const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "15m",
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

export const genateAccessTokenFromRefreshToken = (refreshToken) => {
  if (!refreshToken) {
    return null;
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ user: decoded.user }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    return accessToken;
  } catch (error) {
    return null;
  }
};
