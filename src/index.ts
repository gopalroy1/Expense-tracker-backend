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

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  "https://expense-tracker-frontend-2rx8wjhgk-gopal-roys-projects-4596e853.vercel.app",

  // Preview URLs MUST start with https://
  "https://expense-tracker-frontend-ten-sooty.vercel.app",
  "https://expense-tracker-frontend-git-main-gopal-roys-projects-4596e853.vercel.app",
  "https://expense-tracker-frontend-nfu0mtg3y-gopal-roys-projects-4596e853.vercel.app",

  // NGROK (must be included exactly)
  "https://marlen-overrigid-lonelily.ngrok-free.dev"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman, curl, mobile apps

      if (allowedOrigins.includes(origin)) {
        return callback(null, true); // allow exact origins
      } else {
        console.log("❌ BLOCKED ORIGIN:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

  
app.use(express.json());

// app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/account", accountRoutes);
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