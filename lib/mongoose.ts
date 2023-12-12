import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("Missing MongoDB URL!");
  }

  if (isConnected) {
    return Promise.resolve("MongoDB is already connected!");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });

    isConnected = true;
    Promise.resolve("Connected!");
  } catch (error) {
    console.log("MongoDB connection failed!", error);
    throw new Error("MongoDB connection failed!");
  }
};
