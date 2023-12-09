import jwt from "jsonwebtoken";
import CustomeError from "../errors/customeError.js";

const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("token");
        throw new CustomeError(error.message, 401);
    }
}

export default cookieJwtAuth