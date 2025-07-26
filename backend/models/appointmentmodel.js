import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  studentId: {
    type: String, // Placeholder ID or can be ObjectId in future
    default: 'No student',
  },
  counselorId: {
    type: String, // Placeholder ID or can be ObjectId in future
    default: 'No counselor',
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['consultation', 'document', 'interview', 'application', 'follow-up'],
    default: 'consultation',
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
