"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./routers/router"));
const conne_1 = __importDefault(require("./configs/api/conne"));
const PORTA = parseInt(process.env["PORT"] || '3000', 10);
dotenv_1.default.config();
(0, conne_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(PORTA, () => {
    console.log(`Server is running on port ${PORTA}`);
});
//# sourceMappingURL=index.js.map