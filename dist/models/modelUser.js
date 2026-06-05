"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userShema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cargo: { type: String, enum: ['admin', 'agente', 'cliente', 'user'], default: 'user', required: false },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userShema);
//# sourceMappingURL=modelUser.js.map