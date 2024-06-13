import sharp from 'sharp';

export const convertImage = async (
  filePath: string | undefined,
  filename: string | undefined,
): Promise<void> => {
  if (filePath == null || filename == null) {
    throw new Error('File path and filename must be defined');
  }
  const fileExt = filename.split('.').pop();
  const fileNameWithoutExt = filename.replace(`.${fileExt}`, '');

  try {
    await sharp(filePath)
      .toFormat('avif')
      .toFile(`./public/uploads/${fileNameWithoutExt}.avif`);
    await sharp(filePath)
      .toFormat('webp')
      .toFile(`./public/uploads/${fileNameWithoutExt}.webp`);
  } catch (error) {
    console.error('Error processing image', error);
    throw new Error('Error processing image');
  }
};
