import mongoose from 'mongoose';

import { FEELINGS } from '../utils/constants.js';

const Schema = mongoose.Schema;
const memorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    feelings: {
      type: String,
      required: true,
      enum: Object.values(FEELINGS),
      trim: true,
    },
    imagesUrl: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export default mongoose.model('Memory', memorySchema);
