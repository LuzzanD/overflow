import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing MongoDB URL!");
  }

  if (isConnected) {
    return "MongoDB is already connected!";
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });

    isConnected = true;
    console.log("Connected!");
  } catch (error) {
    console.log("MongoDB connection failed!", error);
  }
};
