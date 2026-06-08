"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const controllPrivate_1 = __importDefault(require("../../controllers/controllPrivate"));
const routerPrivate = express_1.default.Router();
routerPrivate.get('/private', auth_1.auth, controllPrivate_1.default.private);
exports.default = routerPrivate;
//# sourceMappingURL=routerPrivate.js.map