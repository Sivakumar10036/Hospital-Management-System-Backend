const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const mongoose_connection = require("./db/connection");
const admin_router = require("./router/admin");
const auth_router = require("./router/auth");
const public_router = require("./router/public");
const doctor_router = require("./router/doctor");
const patient_router = require("./router/patient");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup for your Vercel frontend
app.use(cors({
  origin: "https://hospital-management-system-frontend-siva-kumar-s-projects.vercel.app",
  credentials: true
}));

// ✅ Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// ✅ MongoDB connection
mongoose_connection(app);

// ✅ Default root route
app.get("/", (req, res) => {
  res.send("Hospital Management System Backend is running.");
});

// ✅ Routes
app.use("/public", public_router);
app.use(auth_router);
app.use(admin_router);
app.use(patient_router);
app.use(doctor_router);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
