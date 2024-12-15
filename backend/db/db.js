import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/test`)
        console.log(`databse connected successfully on ${connectionInstance.connection.host}`);   
    } catch (error) {
        console.log("Error Occured while connecting to database...", error);
        process.exit(1);
    }
    // const conn = await mongoose.connect(process.env.MONGO_URI)
    //     .then(() => {
    //         console.log("Database Connected");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    //     return conn;
}

export default connectDB;