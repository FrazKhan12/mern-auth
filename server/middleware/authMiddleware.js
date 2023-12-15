import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "authentication failed",
          success: false,
        });
      } else {
        req.body._id = decode.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "failed to authenticate user",
      success: false,
    });
  }
};

export default authMiddleware;
