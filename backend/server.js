import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Route imports
import approute from "./routes/application.route.js";
import uniroute from "./routes/university.route.js";
import studroute from "./routes/students.route.js";
import appointment from "./routes/appointment.route.js";
import dashboard from "./routes/admindash.route.js";
import internroute from "./routes/interns.route.js"; // ✅ Add this line

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS to allow frontend access
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true,
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/application', approute);
app.use('/api/university', uniroute);
app.use('/api/students', studroute);
app.use('/api/appointments', appointment);
app.use('/api/dashboard', dashboard);
app.use('/api/interns', internroute); // ✅ Add intern route here
app.use('/uploads', express.static('uploads'));


// Test Route
app.get("/", (req, res) => {
  res.send("Start of Dashboard API");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`);
});
