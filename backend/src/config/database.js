import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}`)
        console.log("Database connected successfully:", connectionInstance.connection.host);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

export default connectDB;