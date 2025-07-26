import mongoose from "mongoose";
const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dept: { type: String, required: true },
  role: { type: String, required: true },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true,
  },
  workflow: {
    type: String,
    enum: ["Onboarding", "Active", "Review", "Completion", "Offboarding"],
    required: true,
  },
  studyAbroad: {
    type: Boolean,
    default: false,
  },
  // 👇 Add this new field
  uploadedFile: {
    fileName: String,
    fileUrl: String, // Or base64 or buffer depending on how you're storing
    uploadedAt: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const InternModel = mongoose.model("Intern", internSchema);
export default InternModel;
