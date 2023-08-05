import Post from "../models/post";

// 새로운 게시글 생성
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content });
    res
      .status(201)
      .json({ message: "게시글이 성공적으로 작성되었습니다.", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "게시글 작성 중 오류가 발생했습니다.", error });
  }
};

// 게시글 조회
export const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;
    const posts = await Post.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "게시글 조회 중 오류가 발생했습니다.", error });
  }
};

// 특정 게시글 조회
export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ message: "게시글를 찾을 수 없습니다." });
    } else {
      res.status(200).json({ post });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "게시글 조회 중 오류가 발생했습니다.", error });
  }
};

// 특정 게시글 수정
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    } else {
      post.title = title;
      post.content = content;
      await post.save();
      res
        .status(200)
        .json({ message: "게시글이 성공적으로 수정되었습니다.", post });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "게시글 수정 중 오류가 발생했습니다.", error });
  }
};

// 특정 게시글  삭제
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ message: "존재 하지 않는 게시글 입니다." });
    } else {
      await post.destroy();
      res.status(200).json({ message: "게시글이 성공적으로 삭제되었습니다." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "게시글 삭제 중 오류가 발생했습니다.", error });
  }
};
