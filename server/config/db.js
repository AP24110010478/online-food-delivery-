import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod = null;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // In development, if MONGO_URI is "local", start an embedded MongoDB
    if (process.env.NODE_ENV !== "production" && (!uri || uri === "local")) {
      console.log("🔧 Starting embedded local MongoDB...");
      
      // We don't specify a port here so it finds an available one automatically
      // This prevents "EADDRINUSE" if another process is using 27017
      mongod = await MongoMemoryServer.create({
        instance: {
          dbName: "foodapp"
        },
      });
      
      uri = mongod.getUri();
      console.log(`📦 Local MongoDB URI: ${uri}`);
    }

    const conn = await mongoose.connect(uri, {
      family: 4,
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    // If it's a fatal startup error, let the process continue so nodemon stays alive
  }
};

export default connectDB;