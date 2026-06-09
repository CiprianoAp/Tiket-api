import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const conne = async () => {
    try {

        await mongoose.connect(`${process.env.URI_MONGO}/${process.env.DB_NAME}`);

        console.log("BD, conectado com sucesso");

    } catch (error) {

        console.error("Erro, ao se conectar com o servidor, verifica a sua internet...:");
    }
};

export default conne;
