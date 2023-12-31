import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "mysecretkey";

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
