import User from "../modals/userModal.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import exceljs from "exceljs";
import fs from "fs";

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    res.status(200).send({
      message: "User updated Succesfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "internal Server Error",
      success: false,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).send({
        message: "Email not registered",
        success: false,
      });
    }
    const otp = Math.ceil(Math.random() * 10000);

    user.otpCode = otp;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fraz9838@gmail.com",
        pass: "xgrl fhwj mjkq yydu",
      },
    });

    const mailOptions = {
      from: "fraz9838@gmail.com",
      to: email,
      subject: "Reset Your password",
      html: `<p>Hello ${user?.userName},</p><br/> Your Otp is for reset Password is ${otp}`,
    };

    transporter.sendMail(mailOptions);

    res.status(200).send({
      message: "Email sent Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        message: "User Not Found",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    user.otpCode = null;
    await user.save();

    res.status(200).send({
      message: "Password reset successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).send({
      message: "User deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "User Data fetch Succesfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getUserCSV = async (req, res) => {
  try {
    const users = await User.find({});

    const workbook = new exceljs.Workbook();

    const sheet = workbook.addWorksheet("users");

    const header = [
      { header: "Username", key: "userName", width: 20 },
      { header: "First Name", key: "firstName", width: 20 },
      { header: "Last Name", key: "lastName", width: 20 },
      { header: "Email", key: "email", width: 20 },
      { header: "Role", key: "role", width: 20 },
    ];

    sheet.columns = header;

    users.forEach((user) => {
      sheet.addRow(user.toObject()); // Ensure each user is converted to a plain object
    });

    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Set response headers
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    // Convert workbook to CSV and send as plain text
    workbook.csv
      .writeBuffer()
      .then((buffer) => {
        res.send(buffer.toString());
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    console.error("Error exporting users:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
