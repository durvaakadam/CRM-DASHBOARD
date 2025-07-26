import mongoose from 'mongoose';

const appliSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },
  status: { type: String, enum: ['draft', 'submitted', 'review', 'accepted', 'rejected'], default: 'draft' },
  notes: String,
  updatedAt: { type: Date, default: Date.now },
});

const applimodel = mongoose.model('Application', appliSchema);
export default applimodel;