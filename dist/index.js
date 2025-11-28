"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const accountRoute_1 = __importDefault(require("./routes/accountRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const netWorthRoute_1 = __importDefault(require("./routes/netWorthRoute"));
// import expenseRoutes from "./routes/expenseRoute";
dotenv_1.default.config();
console.log("ENV:", process.env.DATABASE_URL);
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// app.options("*", cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
app.use(express_1.default.json());
// app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoute_1.default);
app.use("/api/account", accountRoute_1.default);
app.use("/api/account", accountRoute_1.default);
app.use("/api/networth", netWorthRoute_1.default);
// app.use("/api/category", );
const PORT = process.env.PORT || 5000;
console.log("In the index file");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
