import jwt from "jsonwebtoken";

export const getIdFromToken = (req, res) => {
  // Assuming the token is sent in a cookie named 'token'
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    return userId;
  } catch (ex) {
    // Handle invalid token
    res.status(400).send("Invalid token.");
  }
};

export default getIdFromToken;
