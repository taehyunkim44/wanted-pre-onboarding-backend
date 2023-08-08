import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// POST /posts - 새로운 게시글 생성
router.post("/", authMiddleware, createPost);

// GET /posts - 모든 게시글 조회
router.get("/", getPosts);

// GET /posts/:id - 특정 게시글 조회
router.get("/:id", getPost);

// PUT /posts/:id - 특정 게시글 수정
router.put("/:id", authMiddleware, updatePost);

// DELETE /posts/:id - 특정 게시글 삭제
router.delete("/:id", authMiddleware, deletePost);

export default router;
