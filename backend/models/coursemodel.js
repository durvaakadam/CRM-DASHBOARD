import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    country: String,
  });

const coursemodel = mongoose.model('Course', courseSchema);
export default coursemodel;