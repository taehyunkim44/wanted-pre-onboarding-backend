import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/user";
import authMiddleware from "../middlewares/auth";

// POST /register - 사용자 회원가입
router.post("/register", registerUser);

// POST /login - 사용자 로그인
router.post("/login", loginUser);

// authMiddleware를 라우트에 적용
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "인증된 사용자만 접근 가능합니다." });
});

module.exports = router;
