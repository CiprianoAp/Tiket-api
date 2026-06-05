import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cargo:{type: String, enum: ['admin', 'agente', 'cliente','user'], default: 'user', required: false},
},{timestamps: true});

export  const User = mongoose.model('User', userShema);

