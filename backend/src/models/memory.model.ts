import mongoose from 'mongoose';

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
      trim: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ImageUrl',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model('Memory', memorySchema);
