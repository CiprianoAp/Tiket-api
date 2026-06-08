"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routerPublic_1 = __importDefault(require("../private/routerPublic"));
const routerPrivate = express_1.default.Router();
routerPrivate.get('/private', routerPublic_1.default);
exports.default = routerPrivate;
//# sourceMappingURL=routerPublic.js.map