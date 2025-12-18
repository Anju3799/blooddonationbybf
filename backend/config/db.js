import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Trying to connect MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
