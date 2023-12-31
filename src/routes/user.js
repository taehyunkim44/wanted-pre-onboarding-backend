import express from "express";
import { registerUser, loginUser } from "../controllers/user.js";

const router = express.Router();

// POST /register - 사용자 회원가입
router.post("/register", registerUser);

// POST /login - 사용자 로그인
router.post("/login", loginUser);

export default router;
