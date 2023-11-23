import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  roles: {
    type: [String],
    default: ['usuario'],
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
