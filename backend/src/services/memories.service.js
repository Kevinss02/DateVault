import fs from 'fs';

import Memory from '../models/memory.model.js';

export async function getMemory(id, userId) {
  const mem = await Memory.findOne({
    _id: id,
    user: userId,
  });
  if (mem == null) {
    throw new Error(`Memory with id ${id} not found`);
  }
  return mem;
}
export async function getAllMemories(userId) {
  const memories = await Memory.find({
    user: userId,
  });
  if (memories == null) {
    throw new Error(`Not found memories`);
  }
  return memories;
}
export async function addMemory(body, userId, files) {
  const { title, description, feelings, date, location } = body;
  const uploadedImages = [];
  if (Array.isArray(files)) {
    files.forEach((image) => {
      uploadedImages.push(`/uploads/${image.filename}`);
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
    id: newMemory._id.toString(),
  };
}
export async function updateMemory(id, body, userId, files) {
  const { title, description, feelings, date, location } = body;
  const uploadedImages = [];
  if (Array.isArray(files)) {
    files.forEach((image) => {
      uploadedImages.push(`/uploads/${image.filename}`);
    });
  }
  const memory = await Memory.findOneAndUpdate(
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
export async function deleteMemory(id, userId) {
  const memory = await Memory.findOneAndDelete({
    _id: id,
    user: userId,
  });
  if (memory != null) {
    memory.imagesUrl.forEach((image) => {
      deleteImage(`./public/${image}`);
    });
  }
  if (memory == null) {
    throw new Error(`Memory with id ${id} not found`);
  }
  return memory;
}
const deleteImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err != null) {
      console.error(`Error al borrar la imagen: ${err.message}`);
    } else {
      console.log('Imagen borrada correctamente');
    }
  });
};
