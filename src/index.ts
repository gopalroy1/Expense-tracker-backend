import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import accountRoutes from "./routes/accountRoute";
import authRoutes from "./routes/authRoute";
import netWorthRoutes from "./routes/netWorthRoute";
// import expenseRoutes from "./routes/expenseRoute";
dotenv.config();

console.log("ENV:", process.env.DATABASE_URL);



dotenv.config();

const app = express();
app.use(cookieParser());  

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// app.options("*", cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

  
app.use(express.json());

// app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/networth", netWorthRoutes);

// app.use("/api/category", );

const PORT = process.env.PORT || 3000;
console.log("In the index file");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.get("/hello", (req, res) => {
//   res.send("Hi");
// });
export default app;