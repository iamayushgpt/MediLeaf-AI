const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const { connectDB, checkDBConnection, getDBStats } = require("./config/db");

const authRoutes = require("./routes/auth");
const plantRoutes = require("./routes/plants");
const plantDatabaseRoutes = require("./routes/plantRoutes");
const profileRoutes = require("./routes/profile");

const app = express();
dotenv.config();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "http://127.0.0.1:5175",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/plant-database", plantDatabaseRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", async (req, res) => {
  const dbStats = await getDBStats();
  res.json({
    success: true,
    message: "Medicinal Leaves Identification API is running",
    version: "1.0.0",
    database: {
      connected: checkDBConnection(),
      ...dbStats,
    },
    timestamp: new Date().toISOString(),
  });
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working!",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((error, req, res, next) => {
  console.error("Global error:", error);
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
});

const PORT = process.env.PORT || 5001;
const host = "0.0.0.0";

const server = app.listen(PORT, host, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🍃 Medicinal Leaves API ready`);
});

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`❌ Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`❌ Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("✅ Process terminated");
  });
});
