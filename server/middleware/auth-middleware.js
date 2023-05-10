import jwt from "jsonwebtoken";
import ErrorInServer from "../exceptions/error.js";

export default (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if(!refreshToken) return next(ErrorInServer.unauthError())
        const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        if(!userData) return next(ErrorInServer.unauthError())
        next()
    } catch (e) {
        return next(ErrorInServer.unauthError())
    }
};
