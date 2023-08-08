import express from "express";
import cors from "cors";
import postRoutes from "./src/routes/post.js";
import userRoutes from "./src/routes/user.js";
import sequelize from "./src/config/config.js";

const app = express();

// 포트
app.set("port", process.env.PORT || 3000);

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(app.get("port"), () => {
      console.log(app.get("port") + "번 포트에서 실행");
    });
  })
  .catch((err) => console.log("DB 연결 오류.", err));
