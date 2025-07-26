import mongoose from "mongoose";

const connectDB = async () => {
    try {
        
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 100000,
            socketTimeoutMS: 100000,
        });
        console.log(`MongoDB Connected: ${con.connection.host}/${con.connection.name}`);
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};

export default connectDB;
