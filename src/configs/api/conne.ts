import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const conne = async () => {
    try {

        await mongoose.connect(`${process.env.URI_MONGO}/${process.env.DB_NAME}`);

        console.log("Connected to MongoDB");

    } catch (error) {

        console.error("Error connecting to MongoDB:", error);
    }
};

export default conne;
