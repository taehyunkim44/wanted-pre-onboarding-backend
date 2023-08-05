import express from "express";
import cors from "cors";
import postRoutes from "./routes/post";
import userRoutes from "./routes/user";

const app = express();

// 포트
app.set("port", process.env.PORT || 3000);

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트
app.use("/posts", postRoutes.module);
app.use("/users", userRoutes.module);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 실행 중 입니다.");
});
