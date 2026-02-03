// filepath: c:\Users\91758\All Projects\Job-Portal\jobportal-yt\backend\utils\db.js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Rethrow the error to handle it in index.js
    }
};

export default connectDB;