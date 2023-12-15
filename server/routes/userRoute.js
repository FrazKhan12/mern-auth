import express from "express";
import {
  getUserInfoById,
  userLogin,
  userRegister,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  forgetPassword,
  updateUser,
  verifyOtp,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserCSV,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/get-user-info-by-id", authMiddleware, getUserInfoById);
router.put("/update-user", authMiddleware, updateUser);
router.post("/forget-password", authMiddleware, forgetPassword);
router.post("/verify-otp", authMiddleware, verifyOtp);
router.delete("/delete-user/:id", authMiddleware, deleteUser);
router.get("/get-all-user", authMiddleware, getAllUser);
router.get("/get-single-user/:id", authMiddleware, getSingleUser);
router.get("/get-user-csv", getUserCSV);

export default router;
