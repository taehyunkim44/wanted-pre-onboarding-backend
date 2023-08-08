import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/user";

// POST /register - 사용자 회원가입
router.post("/register", registerUser);

// POST /login - 사용자 로그인
router.post("/login", loginUser);

module.exports = router;
