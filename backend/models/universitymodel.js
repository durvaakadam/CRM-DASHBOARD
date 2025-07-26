import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
  name: String,
  degree: String,
  duration: String,
  tuitionFees: String,
  requirements: String,
});

const uniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: String,
  website: String,
  programs: [ProgramSchema],
  createdAt: { type: Date, default: Date.now },
});

const unimodel = mongoose.model("University", uniSchema);
export default unimodel;