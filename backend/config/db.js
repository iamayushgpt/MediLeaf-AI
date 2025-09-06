const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`🍃 MongoDB Connected: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ Mongoose disconnected");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Function to check database connection status
const checkDBConnection = () => {
  return mongoose.connection.readyState === 1;
};

// Function to get database stats
const getDBStats = async () => {
  try {
    if (!checkDBConnection()) {
      return { connected: false };
    }

    const stats = await mongoose.connection.db.stats();
    return {
      connected: true,
      database: mongoose.connection.name,
      collections: stats.collections,
      dataSize: `${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`,
      indexSize: `${(stats.indexSize / 1024 / 1024).toFixed(2)} MB`,
    };
  } catch (error) {
    console.error("Error getting database stats:", error);
    return { connected: false, error: error.message };
  }
};

module.exports = {
  connectDB,
  checkDBConnection,
  getDBStats,
};
