import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import accountRoutes from "./routes/accountRoute";
import adminRouter from "./routes/adminRoute";
import authRoutes from "./routes/authRoute";
import dashboardRoutes from "./routes/dashboardRoutes";
import emailRouter from "./routes/emailRoute";
import expensesRouter from "./routes/expensesRoute";
import healthRouter from "./routes/healthRoute";
import netWorthRoutes from "./routes/netWorthRoute";
// import expenseRoutes from "./routes/expenseRoute";
dotenv.config();

console.log("ENV:", process.env.DATABASE_URL);



dotenv.config();

const app = express();

app.use(morgan("[:date[iso]] :method :url :status :response-time ms"));
app.use(cookieParser());


const ALLOWED_ORIGINS = new Set([
  "https://myfininsight.com",
  "https://www.myfininsight.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

app.use(
  cors({
    origin: (origin, cb) => {
      // allow server-to-server / curl (no Origin header)
      if (!origin || ALLOWED_ORIGINS.has(origin)) return cb(null, true);
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);


  
app.use(express.json());

// app.use("/api/expenses", expenseRoutes);
app.use("/health", healthRouter);
app.use("/api/auth", authRoutes);
// app.use("/api/account", accountRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/networth", netWorthRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/emails", emailRouter);
app.use("/api/admin", adminRouter);
app.use("/api/expenses", expensesRouter);



// app.use("/api/category", );

const PORT = process.env.PORT || 3000;
console.log("In the index file");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.get("/hello", (req, res) => {
//   res.send("Hi");
// });
export default app;