import mongoose from 'mongoose';

import { HOST, PORT } from '../config.js';
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

memorySchema.methods.setImagesUrl = function setImagesUrl(filenames: string[]) {
  try {
    const newImagesUrl = filenames.map((filename) => {
      const imgUrl = `${HOST}:${PORT}/public/${filename}`;
      return imgUrl;
    });

    this.imagesUrl = newImagesUrl;
  } catch (error) {
    console.error('Error al procesar las URLs de imagen:', error);
    throw error;
  }
};

export default mongoose.model('Memory', memorySchema);
