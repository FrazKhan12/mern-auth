import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (connect) {
      console.log("Databse Connected Succesfully");
    }
  } catch (error) {
    console.log("Error connecting to Database", error);
  }
};

export default dbConnect;
