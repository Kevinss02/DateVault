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
  files?: any,
): Promise<MemoryResponse> {
  const { title, description, feelings, date, location } = body;

  const uploadedImages: string[] = [];
  if (files?.image != null) {
    console.log('File not empty');
  }

  const newMemory = new Memory({
    title,
    description,
    feelings,
    date,
    location,
    images: uploadedImages,
    user: userId,
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
    id: newMemory._id.toString(),
  };
}

export async function updateMemory(
  id: string,
  body: MemoryType,
  userId: string,
  files?: any,
): Promise<MemoryResponse> {
  const { title, description, feelings, date, location } = body;

  const uploadedImages: string[] = [];
  if (files?.image != null) {
    console.log('File not empty');
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
        images: uploadedImages,
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

  if (memory == null) {
    throw new Error(`Memory with id ${id} not found`);
  }

  return memory;
}
