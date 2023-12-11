import Memory from '../models/memory.model.js';
import { MemoryResponse, MemoryType } from '../utils/types/types.js';

export async function getMemory(id: string): Promise<MemoryType> {
  const mem: MemoryType | null = await Memory.findById(id);

  if (mem == null) {
    throw new Error(`Memory with id ${id} not found`);
  }

  return mem;
}

export async function getAllMemories(): Promise<MemoryType[]> {
  const memories: MemoryType[] | null = await Memory.find({});

  if (memories == null) {
    throw new Error(`Not found memories`);
  }

  return memories;
}

export async function addMemory(
  body: MemoryType,
  files?: any,
): Promise<MemoryResponse> {
  const { title, description, feelings } = body;

  const uploadedImages: string[] = [];
  if (files?.image != null) {
    console.log('File not empty');
  }

  const newMemory = new Memory({
    title,
    description,
    feelings,
    images: uploadedImages,
  });

  await newMemory.save();

  return {
    title: newMemory.title,
    description: newMemory.description,
    feelings: newMemory.feelings,
    imagesUrl: newMemory.imagesUrl,
    createdAt: newMemory.createdAt,
    updatedAt: newMemory.updatedAt,
    id: newMemory._id.toString(),
  };
}

export async function updateMemory(
  id: string,
  body: MemoryType,
  files?: any,
): Promise<MemoryResponse> {
  const { title, description, feelings } = body;

  const uploadedImages: string[] = [];
  if (files?.image != null) {
    console.log('File not empty');
  }

  const memory: MemoryResponse | null = await Memory.findByIdAndUpdate(
    id,
    { $set: { title, description, feelings, images: uploadedImages } },
    { new: true },
  );

  if (memory == null) {
    throw new Error(`Not found memories`);
  }

  return memory;
}

export async function deleteMemory(id: string): Promise<MemoryType> {
  const mem: MemoryType | null = await Memory.findByIdAndDelete(id);

  if (mem == null) {
    throw new Error(`Memory with id ${id} not found`);
  }

  return mem;
}
