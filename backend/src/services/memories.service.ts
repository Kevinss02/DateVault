import { Express } from 'express-serve-static-core';

import { deleteImage } from '../helpers/deleteImage.js';
import Memory from '../models/memory.model.js';
import { MemoryResponse, MemoryType } from '../utils/types/types.js';

export async function getMemory(
  id: string,
  userId: string,
): Promise<MemoryType> {
  const mem: MemoryType | null = await Memory.findOne({
    _id: id,
    user: userId,
  });

  if (mem == null) {
    throw new Error(`Memory with id ${id} not found`);
  }

  return mem;
}

export async function getAllMemories(userId: string): Promise<MemoryType[]> {
  const memories: MemoryType[] | null = await Memory.find({
    user: userId,
  });

  if (memories == null) {
    throw new Error(`Not found memories`);
  }

  return memories;
}

export async function addMemory(
  body: MemoryType,
  userId: string,
  files?:
    | Record<string, Express.Multer.File[]>
    | Express.Multer.File[]
    | undefined,
): Promise<MemoryResponse> {
  const { title, description, feelings, date, location } = body;

  const uploadedImages: string[] = [];
  if (Array.isArray(files)) {
    files.forEach((image: { filename: string }) => {
      const fileNameWithoutExt = image.filename.substring(
        0,
        image.filename.lastIndexOf('.'),
      );
      uploadedImages.push(`/uploads/${fileNameWithoutExt}`);
    });
  }

  const newMemory = new Memory({
    title,
    date,
    description,
    feelings,
    imagesUrl: uploadedImages,
    user: userId,
    location,
  });

  await newMemory.save();

  return {
    title: newMemory.title,
    description: newMemory.description,
    feelings: newMemory.feelings,
    date: newMemory.date,
    location: newMemory.location,
    imagesUrl: newMemory.imagesUrl,
    createdAt: newMemory.createdAt,
    updatedAt: newMemory.updatedAt,
    _id: newMemory._id.toString(),
  };
}

export async function updateMemory(
  id: string,
  body: MemoryType,
  userId: string,
  files?:
    | Record<string, Express.Multer.File[]>
    | Express.Multer.File[]
    | undefined,
): Promise<MemoryResponse> {
  const { title, description, feelings, date, location, imagesUrl } = body;

  if (Array.isArray(files)) {
    files.forEach((image: { filename: string }) => {
      imagesUrl.push(`/uploads/${image.filename}`);
    });
  }

  const memory: MemoryResponse | null = await Memory.findOneAndUpdate(
    { _id: id, user: userId },
    {
      $set: {
        title,
        description,
        feelings,
        date,
        location,
        imagesUrl,
        user: userId,
      },
    },
    { new: true, runValidators: true, context: 'query' },
  );

  if (memory == null) {
    throw new Error(`Not found memories`);
  }

  return memory;
}

export async function deleteMemory(
  id: string,
  userId: string,
): Promise<MemoryType> {
  const memory: MemoryType | null = await Memory.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (memory != null) {
    memory.imagesUrl.forEach((image) => {
      deleteImage(`./public/${image}`);
    });
  } else {
    throw new Error(`Memory with id ${id} not found`);
  }

  return memory;
}
