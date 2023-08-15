import { verifyToken } from "../utils/auth.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "인증되지 않은 사용자입니다." });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "올바른 토큰 형식이 아닙니다." });
    }

    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "토큰 인증에 실패했습니다.", error });
  }
};
