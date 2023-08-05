import express from "express";
const router = express.Router();
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post";
import auth from "../middlewares/auth";

// POST /posts - 새로운 게시글 생성
router.post("/", auth, createPost);

// GET /posts - 모든 게시글 조회
router.get("/", getPosts);

// GET /posts/:id - 특정 게시글 조회
router.get("/:id", getPost);

// PUT /posts/:id - 특정 게시글 수정
router.put("/:id", auth, updatePost);

// DELETE /posts/:id - 특정 게시글 삭제
router.delete("/:id", auth, deletePost);

module.exports = router;
