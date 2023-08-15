import User from "../models/user.js";
import { generateToken } from "../utils/auth.js";

// 사용자 회원가입
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 이메일과 비밀번호 유효성 검사
    if (!email.includes("@")) {
      return res
        .status(400)
        .json({ message: "올바른 이메일 형식이 아닙니다." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "비밀번호는 최소 8자 이상이어야 합니다." });
    }

    const user = await User.create({ email, password });
    res
      .status(201)
      .json({ message: "회원가입이 성공적으로 완료되었습니다.", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "회원가입 중 오류가 발생했습니다.", error });
  }
};

// 사용자 로그인
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "해당 이메일을 가진 사용자를 찾을 수 없습니다." });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "비밀번호가 올바르지 않습니다." });
    }
    const token = generateToken(user);
    res.status(200).json({ message: "로그인에 성공했습니다.", token });
  } catch (error) {
    res.status(500).json({ message: "로그인 중 오류가 발생했습니다.", error });
  }
};
