import express from "express";
import dbConnect from "./config/dbConfig.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);

const PORT = process.env.port || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

dbConnect();
