import jwt from "jsonwebtoken";

export const setTokenCookie = (res,req ,user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

};
