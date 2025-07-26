import mongoose from "mongoose";

const studSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    nationality: String,
    education: String,
    testScores: String,
    documents: [String],
    createdAt: { type: Date, default: Date.now }
});


const studmodel = mongoose.model("Student", studSchema);
export default studmodel;