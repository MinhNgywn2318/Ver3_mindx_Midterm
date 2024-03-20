import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  personalSkills: [String],
  interests: String,
  personalGoals: [String],
});

export default mongoose.model('Profile', profileSchema);