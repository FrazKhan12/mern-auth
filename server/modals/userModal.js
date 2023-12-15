import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    city: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    newPassword: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    otpCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

// // Verify Password Method
// userSchema.methods.verifyPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

// // Get Password Hash Method
// userSchema.methods.getPasswordHash = async function (password) {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);
//   return hash;
// };

// Pre-save Hook
userSchema.pre("save", async function (next) {
  console.log("pre hook: validate username");

  try {
    const regex = /^[a-zA-Z0-9]+$/;
    const isUsernameValid = regex.test(this.userName);

    if (!isUsernameValid) {
      console.log("this will stop execution of next middlewares");
      throw new Error("username is not alphanumeric");
    }

    if (!this.isModified("password")) {
      console.log("Password not modified, skipping hashing");
      return next();
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;

      console.log("database hashed password", this.password);

      return next();
    }
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

const userModal = new mongoose.model("users", userSchema);

export default userModal;
