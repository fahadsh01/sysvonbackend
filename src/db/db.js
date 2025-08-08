import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const dbconnection = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(
      `\n mongoDB connected !! db host : ${dbconnection.connection.host}`
    );
  } catch (error) {
    console.error("error during the connection to database:", error);
    process.exit(1);
  }
};

export default dbConnect;
