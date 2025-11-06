import config from "../../core/config/index.js";
import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = { userId: decoded.sub };
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};
//# sourceMappingURL=auth.middleware.js.map