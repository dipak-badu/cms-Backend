import mongoose from "mongoose";
import { mongoConfig } from "./appConfig";

(async () => {
  try {
    console.log("*******Connecting to MongoDB******");
    await mongoose.connect(mongoConfig.url as string, {
      dbName: mongoConfig.name,
      autoCreate: true,
      autoIndex: true,
    });
    console.log("*******Connected to MongoDB******");
  } catch (exception) {
    console.log("Error while connecting to MongoDB", exception);
    process.exit(1);
  }
})();
