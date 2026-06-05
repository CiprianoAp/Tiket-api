import mongoose from "mongoose";

const conne = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/tikets");

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default conne;
